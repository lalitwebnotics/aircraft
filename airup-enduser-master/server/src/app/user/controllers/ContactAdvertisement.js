import Controller from '../../../modules/Controller';
import AwsSES from "../../../modules/AwsSES";


export default  class ContactAdvertisement extends Controller {
  model = 'ContactAdvertisement';

  validators = {
    create: {
      email: ['required', 'email', 'unique:ContactAdvertisement'],
      name: ['required'],
      phoneNumber: ['required'],
      description: ['required']
    }
  };

  /**
   * Create single
   */
  create(request) {
    const ses = new AwsSES();
    let details = null;
    return this
      .validate('create', request)
      .then((inputs) => (
        this.getModel().create(inputs)
      ))
      .then((data) => {
        details = data;
        return ses.sendThankYouEmailForAdvertisement(data.email, 'Advertisement Registration Successful')
      })
      .then(() => {
        return ses.sendEmailAdvertisementNotification( 'Advertisement Register Notification', {
          name: details.name,
          email: details.email,
          companyName: details.companyName,
          phoneNumber: details.phoneNumber,
          description: details.description,
        })
      })
      .then(() => (
        this.getModel()
          .findOne({ _id: details._id }, '-password -token')
      ));
  }
}
