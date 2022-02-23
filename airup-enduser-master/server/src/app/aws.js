import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});


export default class AWS_Task {

  constructor() {
    this.S3 = new AWS.S3({
      params: { Bucket: process.env.BUCKET_NAME }
    });
  }

  uploadS3 = (name, fileBuffer) => {
    return new Promise((resolve, reject) => {
      this.S3.upload({
        Bucket: process.env.BUCKET_NAME,
        Key: name,
        Body: fileBuffer,
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      })
    })
  }

  getPdfBuffer = async (name) => {
    try {
      const data = await this.S3.getObject({
        Bucket: process.env.BUCKET_NAME,
        Key: name,
      }).promise();
      return data.Body;
    } catch(err) {
      throw new Error(`Could not retrieve file from S3: ${err.message}`)
    }
  }

}
