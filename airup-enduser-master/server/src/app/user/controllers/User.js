import querystring from 'querystring';

import Controller from '../../../modules/Controller';
import Exception from '../../../modules/Exception';
import AwsSES from '../../../modules/AwsSES'
import AwsS3 from '../../aws';
import { omit } from 'lodash';

/**
 * Error codes
 */
export const INVALID_TOKEN = 'Invalid token';
export const USER_NOT_FOUND = 'User not found';

/**
 * Populate fields
 */
export const populate = [
  'address',
  'contacts'
];

/**
 * User controller
 */
export default class User extends Controller {

  /**
   * Use User model
   */
  model = 'User';

  /**
   * Sanitizers
   */
  sanitizers = {
    create: {
      email: ['toLower', 'trim'],
      name: ['trim'],
      username: ['toLower', 'trim']
    },
    resetPassword: {
      user: ['toLower', 'trim']
    },
    updatePassword: {
      user: ['toLower', 'trim']
    }
  };

  /**
   * Validators
   */
  validators = {
    create: {
      email: ['required', 'email', 'unique:User'],
      name: ['required'],
      password: ['required', 'password'],
      username: ['required', 'username', 'unique:User']
    },
    resetPassword: {
      user: ['required']
    },
    updatePassword: {
      password: ['required', 'password'],
      token: ['required'],
      user: ['required']
    },
    updateAccount: {
      name: ['required'],
      phone: ['required'],
      email : ['required'],
      subscription: ['required']
    }
  };

  /**
   * Create single
   */
  create(request) {
    return this
      .validate('create', request)
      .then((inputs) => (
        this.getModel().create(inputs)
      ))
      .then(({ _id, email, name }) => (
        this.app.mail({
          recipients: [{
            email,
            name
          }],
          subject: 'Welcome to Aircraft Upgrade',
          template: 'user.welcome',
          data: {
            name
          }
        }).then(() => _id)
          .catch(() => (
            Promise.resolve(_id)
          ))
      ))
      .then((_id) => (
        this.getModel()
          .findOne({ _id }, '-password -token')
      ));
  }

  /**
   * Delete single
   */
  delete() {
    return Promise.resolve({
      success: true
    })
  }

  /**
   * Get multiple
   */
  multiple(request) {
    return this.paginate(request, {
      populate
    });
  }

  /**
   * Reset password
   */
  resetPassword(request) {
    let ses = new AwsSES();
    return this.validate('resetPassword', request).then(({ user = '' }) => (
      this.getModel().findAccount(user).then((user) => (
        user ?
          user.generateToken() :
          Exception.reject(USER_NOT_FOUND, 400)
      )).then(({ email, name, token }) => (

        ses.sendResetEmail(email, 'Password Reset', {
          name,
          link: this.app.config.url + 'password-reset?' + querystring.stringify({
            user: email,
            token
          })
        })
      ))
    )).then(() => ({
      success: true
    }));
  }

  /**
   * Get single
   */
  single(request) {
    return this.getSingle(request, 'user_id');
  }

  /**
   * Update single
   */
  update() {
    return Promise.resolve({});
  }

  /**
   * Update passwrd
   */
  updatePassword(request) {
    let ses = new AwsSES();
    return this.validate('updatePassword', request).then(({ password, token, user = '' }) => (
      this.getModel().findAccount(user).then((user) => {
        if (!user) {
          return Exception.reject(USER_NOT_FOUND, 400);
        }
        if (user.token !== token) {
          return Exception.reject(INVALID_TOKEN, 401);
        }
        user.password = password;
        user.token = '';
        return user.save();
      })
    )).then(({ email, name }) => (

      ses.sendConfirmEmail(email,'Password Reset Confirmation', {
        name,
        link: this.app.config.url + 'login'
      })
    )).then(() => ({
      success: true
    }));
  }

  /**
   * Update account
   */
  updateAccount(request) {
    return this.validate('updateAccount', request).then(({ phone, email, subscription = '', name }) => (
      this.getModel("User").findById(request.params.user_id).then((user) => {
        if (!user) {
          return Exception.reject(USER_NOT_FOUND, 400);
        }

        user.phone = phone;
        user.email = email;
        user.subscription = subscription;
        user.name = name;

        return user.save();
      })
    )).then(() => ({
      success: true
    }));
  }

  updateProfilePicture(request) {
    const s3 = new AwsS3();
    return this.validate('file', request).then(async ({ }) => {

      let image = request.req.files.file;
      let name = image.name;
      let type = image.mimetype;

      try {
        // Use the mv() method to place the file somewhere on your server
        // image.mv( 'data/data/media/photos/'+ name, function(err) {
        //   if (err)
        //   return Exception.reject(err, 500);
        // });
        let fileName = `user-profile/${Date.now()}_${request.attachments.session.toObject().user}_${(name || '').replace(/\s/g, '')}`;

        const data = await s3.uploadS3(fileName, image.data);
        const user = await this.getModel()
          .findByIdAndUpdate(request.attachments.session.toObject().user, {
            imageUrl: fileName
          });
        // const media = await this.getModel('Media').create({
        //   name,
        //   type,
        //   full_path: data.key
        // });
        // const doc = await this.getModel().findById(request.body.id);
        // doc.media.push(media);
        // doc.save();

        return {
          user: omit(user.toObject(), ['password'])
        };
      } catch (err) {
        console.log(err)
      }
    })
  }

  sendMail(){
    const ses = new AwsSES();
    // call sesClient to send an email
    ses.send('user@example.com', "Hey! Welcome", "This is the body of email");
  }
}
