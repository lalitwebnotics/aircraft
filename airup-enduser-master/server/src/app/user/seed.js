import { queue } from '../../modules/utils';

/**
 * Users data
 */
const users = [{
  email: 'admin@aircraftupgrade.com',
  name: 'Administrator',
  password: 'admin',
  role: 'admin',
  status: 'active',
  username: 'admin'
}];

/**
 * Seed User
 */
export default ({ getModel, mongoose: { connection } }) => queue([
  /**
   * Seed users
   */
  () => {
    console.log('Seeding user(s)...');
    let count = 0;
    const User = getModel('User'),
          { collectionName } = User.collection;
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(users.map((data) => {
        return () => {
          return User.create(data).then((user) => {
            count++;
            return user;
          });
        }
      })).then(() => {
        console.log('Seeded ' + count + ' user(s)');
      });
    });
  },
  /**
   * Truncate session collection
   */
  () => {
    console.log('Emptying sessions...');
    const Session = getModel('Session'),
          { collectionName } = Session.collection;
    return connection.dropCollection(collectionName).catch(() => {
      return Promise.resolve();
    }).then((result) => {
      console.log('Emptied sessions');
      return result;
    })
  }
]);
