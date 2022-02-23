"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populate = exports.default = void 0;var _lodash = require("lodash");
var _utils = require("../../../modules/utils");
var _Controller = _interopRequireDefault(require("../../../modules/Controller"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
 * Populate fields
 */
const populate = [
'address',
'contacts'];


/**
 * Manufacturer controller
 */exports.populate = populate;
class Manufacturer extends _Controller.default {constructor(...args) {super(...args);_defineProperty(this, "model",




    'Manufacturer');_defineProperty(this, "sanitizers",




    {
      create: {
        address: {
          city: ['trim'],
          country: ['trim'],
          line_1: ['trim'],
          line_2: ['trim'],
          state: ['trim'],
          zip_code: ['trim'] },

        contacts: {
          type: ['trim'],
          value: ['trim'] },

        name: ['trim'],
        nickname: ['trim'] },

      update: {
        address: {
          city: ['trim'],
          country: ['trim'],
          line_1: ['trim'],
          line_2: ['trim'],
          state: ['trim'],
          zip_code: ['trim'] },

        contacts: {
          type: ['trim'],
          value: ['trim'] },

        name: ['trim'],
        nickname: ['trim'] } });_defineProperty(this, "validators",






    {
      create: {
        contacts: ['contact'],
        name: ['required'] },

      update: {
        contacts: ['contact'],
        name: ['required'] } });}



  /**
   * Create single
   */
  create(request) {
    return this.validate('update', request).then(({ address, contacts, name, nickname }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        safe }).
      then((count) => {
        return Promise.all([
        this.simplifyAddress(null, address),
        this.simplifyContacts(null, contacts)]).
        then((responses) => {
          return this.getModel().create({
            address: responses[0],
            contacts: responses[1],
            name,
            nickname,
            permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
            safe });

        });
      });
    }).then(({ _id }) =>
    this.getModel().
    findById(_id).
    populate(populate));

  }

  /**
   * Delete single
   */
  async delete(request) {
    const manufacturer = await this.getModel().
    findById(request.params.manufacturer_id, 'address contacts');
    if (!manufacturer) {
      return {
        success: true };

    }
    if (manufacturer.address) {
      await this.getModel('Address').
      findByIdAndDelete(manufacturer.address.toString());
    }
    const contacts = manufacturer.contacts || [];
    for (let i = 0; i < contacts.length; i++) {
      await this.getModel('Contact').
      findByIdAndDelete(contacts[i].toString());
    }
    await this.getModel().findByIdAndDelete(manufacturer._id);
    return {
      success: true };

  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      filters: (filters) => {
        if (request.query.name) {
          filters.name = {
            $regex: new RegExp(request.query.name, 'i') };

        }
        return filters;
      },
      populate });

  }

  /**
   * Simplify address
   */
  async simplifyAddress(id, address = null) {
    const Address = this.getModel('Address'),
    manufacturer = await this.getModel().findById(id, 'address'),
    address_id = (manufacturer || {}).address ? manufacturer.address.toString() : null,
    current = address_id ? await Address.findById(address_id) : null;
    if (!address) {
      if (current) {
        await Address.findByIdAndDelete(address_id);
      }
      return null;
    }
    const inputs = (0, _lodash.pick)(address, [
    'city',
    'country',
    'line_1',
    'line_2',
    'state',
    'zip_code']);

    if (current) {
      await Address.findByIdAndUpdate(address_id, inputs);
      return address_id;
    } else {
      return (await Address.create(inputs))._id.toString();
    }
  }

  /**
   * Simplify contacts
   */
  async simplifyContacts(id, contacts = []) {
    const Contact = this.getModel('Contact'),
    manufacturer = await this.getModel().findById(id, 'contacts'),
    current_ids = ((manufacturer || {}).contacts || []).map((contact) => contact.toString()),
    contact_ids = [];
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i],
      inputs = (0, _lodash.pick)(contact, ['type', 'value']);
      if ((0, _lodash.isEmpty)(inputs.value)) {
        if (contact._id) {
          await Contact.findByIdAndDelete(contact._id);
        }
      } else {
        if (contact._id) {
          if (current_ids.indexOf(contact._id) >= 0) {
            await Contact.findByIdAndUpdate(contact._id, inputs);
            contact_ids.push(contact._id);
          } else {
            contact_ids.push((await Contact.create(inputs))._id);
            await Contact.findByIdAndDelete(contact._id);
          }
        } else {
          contact_ids.push((await Contact.create(inputs))._id);
        }
      }
    }
    for (let j = 0; j < current_ids.length; j++) {
      if (contact_ids.indexOf(current_ids[j]) < 0) {
        await Contact.findByIdAndDelete(current_ids[j]);
      }
    }
    return contact_ids;
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'manufacturer_id');
  }

  /**
   * Update single
   */
  update(request) {
    const id = request.params.manufacturer_id;
    return this.validate('update', request).then(({ address, contacts, name, nickname }) => {
      const safe = (0, _utils.permalink)(name);
      return this.getModel().countDocuments({
        _id: {
          $ne: id },

        safe }).
      then((count) => {
        return Promise.all([
        this.simplifyAddress(id, address),
        this.simplifyContacts(id, contacts)]).
        then((responses) => {
          return this.getModel().findByIdAndUpdate(id, {
            address: responses[0],
            contacts: responses[1],
            name,
            nickname,
            permalink: safe + (count > 0 ? '-' + (count + 1) : ''),
            safe });

        });
      });
    }).then(({ _id }) =>
    this.getModel().
    findById(_id).
    populate(populate));

  }}exports.default = Manufacturer;