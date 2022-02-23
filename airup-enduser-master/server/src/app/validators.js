import Contact from './core/validators/Contact';
import Email from './core/validators/Email';
import Password from './user/validators/Password';
import Required from './core/validators/Required';
import Unique from './core/validators/Unique';
import Username from './user/validators/Username';

export default {
  contact: Contact,
  email: Email,
  password: Password,
  required: Required,
  unique: Unique,
  username: Username
};
