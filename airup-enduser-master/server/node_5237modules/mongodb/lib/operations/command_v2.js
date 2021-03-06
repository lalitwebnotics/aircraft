'use strict';

const Aspect = require('./operation').Aspect;
const OperationBase = require('./operation').OperationBase;
const ReadPreference = require('../core').ReadPreference;
const ReadConcern = require('../read_concern');
const WriteConcern = require('../write_concern');
const maxWireVersion = require('../core/utils').maxWireVersion;
const decorateWithExplain = require('../utils').decorateWithExplain;
const commandSupportsReadConcern = require('../core/sessions').commandSupportsReadConcern;
const MongoError = require('../core/error').MongoError;
const extractCommand = require('../command_utils').extractCommand;

const SUPPORTS_WRITE_CONCERN_AND_COLLATION = 5;

class CommandOperationV2 extends OperationBase {
  constructor(parent, options, operationOptions) {
    super(options);

    this.ns = parent.s.namespace.withCollection('$cmd');
    const propertyProvider = this.hasAspect(Aspect.NO_INHERIT_OPTIONS) ? undefined : parent;
    this.readPreference = this.hasAspect(Aspect.WRITE_OPERATION)
      ? ReadPreference.primary
      : ReadPreference.resolve(propertyProvider, this.options);
    this.readConcern = resolveReadConcern(propertyProvider, this.options);
    this.writeConcern = resolveWriteConcern(propertyProvider, this.options);

    if (operationOptions && typeof operationOptions.fullResponse === 'boolean') {
      this.fullResponse = true;
    }

    // TODO: A lot of our code depends on having the read preference in the options. This should
    //       go away, but also requires massive test rewrites.
    this.options.readPreference = this.readPreference;

    // TODO(NODE-2056): make logger another "inheritable" property
    if (parent.s.logger) {
      this.logger = parent.s.logger;
    } else if (parent.s.db && parent.s.db.logger) {
      this.logger = parent.s.db.logger;
    }
  }

  executeCommand(server, cmd, callback) {
    // TODO: consider making this a non-enumerable property
    this.server = server;

    const options = this.options;
    const serverWireVersion = maxWireVersion(server);
    const inTransaction = this.session && this.session.inTransaction();

    if (this.readConcern && commandSupportsReadConcern(cmd) && !inTransaction) {
      Object.assign(cmd, { readConcern: this.readConcern });
    }

    if (options.collation && serverWireVersion < SUPPORTS_WRITE_CONCERN_AND_COLLATION) {
      callback(
        new MongoError(
          `Server ${server.name}, which reports wire version ${serverWireVersion}, does not support collation`
        )
      );
      return;
    }

    if (serverWireVersion >= SUPPORTS_WRITE_CONCERN_AND_COLLATION) {
      if (this.writeConcern && this.hasAspect(Aspect.WRITE_OPERATION)) {
        Object.assign(cmd, { writeConcern: this.writeConcern });
      }

      if (options.collation && typeof options.collation === 'object') {
        Object.assign(cmd, { collation: options.collation });
      }
    }

    if (typeof options.maxTimeMS === 'number') {
      cmd.maxTimeMS = options.maxTimeMS;
    }

    if (typeof options.comment === 'string') {
      cmd.comment = options.comment;
    }

    if (this.hasAspect(Aspect.EXPLAINABLE) && this.explain) {
      if (serverWireVersion < 6 && cmd.aggregate) {
        // Prior to 3.6, with aggregate, verbosity is ignored, and we must pass in "explain: true"
        cmd.explain = true;
      } else {
        cmd = decorateWithExplain(cmd, this.explain);
      }
    }

    if (this.logger && this.logger.isDebug()) {
      const extractedCommand = extractCommand(cmd);
      this.logger.debug(
        `executing command ${JSON.stringify(
          extractedCommand.shouldRedact ? `${extractedCommand.name} details REDACTED` : cmd
        )} against ${this.ns}`
      );
    }

    server.command(this.ns.toString(), cmd, this.options, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (this.fullResponse) {
        callback(null, result);
        return;
      }

      callback(null, result.result);
    });
  }
}

function resolveWriteConcern(parent, options) {
  return WriteConcern.fromOptions(options) || (parent && parent.writeConcern);
}

function resolveReadConcern(parent, options) {
  return ReadConcern.fromOptions(options) || (parent && parent.readConcern);
}

module.exports = CommandOperationV2;
