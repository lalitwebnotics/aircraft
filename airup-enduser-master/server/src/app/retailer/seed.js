import { keys } from 'lodash';
import { permalink, queue } from '../../modules/utils';
import { manufacturers } from '../../../data/data.json';

/**
 * Seed manufacturer
 */
export default ({ getModel, mongoose: { connection }, seeded }) => queue([
  /**
   * Seed manufacturers
   */
  () => {
    console.log('Seeding manufacturer(s)...');
    const Address = getModel('Address'),
          Contact = getModel('Contact'),
          Manufacturer = getModel('Manufacturer'),
          { collectionName } = Manufacturer.collection;
    seeded.Manufacturer = {};
    return connection.dropCollection(collectionName).catch(() => Promise.resolve()).then(() => {
      return queue(manufacturers.map(({ address, contacts, id, name, nickname }) => {
        return () => {
          const children = {
            address: undefined,
            contacts: []
          };
          return queue([
            () => Address.create(address).then(({ _id }) => {
              children.address = _id;
            }),
            () => queue(contacts.map((contact) => {
              return () => Contact.create(contact).then(({ _id }) => {
                children.contacts.push(_id);
              });
            }))
          ]).then(() => {
            const safe = permalink(name);
            return Manufacturer.create({
              ...children,
              name,
              nickname,
              permalink: safe,
              safe
            }).then((manufacturer) => {
              return seeded.Manufacturer[id] = manufacturer;
            });
          });
        }
      })).then(() => {
        console.log('Seeded ' + keys(seeded.Manufacturer).length + ' manufacturer(s)');
      });
    });
  }
]);
