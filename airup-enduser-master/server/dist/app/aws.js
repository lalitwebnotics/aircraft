"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _awsSdk = _interopRequireDefault(require("aws-sdk"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_awsSdk.default.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY });



class AWS_Task {

  constructor() {_defineProperty(this, "uploadS3",





    (name, fileBuffer) => {
      return new Promise((resolve, reject) => {
        this.S3.upload({
          Bucket: process.env.BUCKET_NAME,
          Key: name,
          Body: fileBuffer,
          ACL: 'public-read' },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        });
      });
    });_defineProperty(this, "getPdfBuffer",

    async (name) => {
      try {
        const data = await this.S3.getObject({
          Bucket: process.env.BUCKET_NAME,
          Key: name }).
        promise();
        return data.Body;
      } catch (err) {
        throw new Error(`Could not retrieve file from S3: ${err.message}`);
      }
    });this.S3 = new _awsSdk.default.S3({ params: { Bucket: process.env.BUCKET_NAME } });}}exports.default = AWS_Task;