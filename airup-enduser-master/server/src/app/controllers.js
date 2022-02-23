import Core from './core/controllers/Core';
import Aircraft from './aircraft/controllers/Aircraft';
import AircraftMake from './aircraft/controllers/Make';
import AircraftModel from './aircraft/controllers/Model';
import Certificate from './certificate/controllers/Certificate';
import EngineMake from './engine/controllers/Make';
import EngineModel from './engine/controllers/Model';
import Manufacturer from './manufacturer/controllers/Manufacturer';
import Rebate from './rebate/controllers/Rebate';
import Retailer from './retailer/controllers/Retailer';
import RetailerProducts from './retailer_products/controllers/RetailerProducts';
import Media from './media/controllers/Media';
import Category from './product/controllers/Category';
import Product from './product/controllers/Product';
import Session from './user/controllers/Session';
import User from './user/controllers/User';
import ContactAdvertisement from './user/controllers/ContactAdvertisement';

export default {
  core: Core,
  aircraft: {
    aircraft: Aircraft,
    make: AircraftMake,
    model: AircraftModel
  },
  certificate: Certificate,
  engine: {
    make: EngineMake,
    model: EngineModel
  },
  rebate: Rebate,
  retailer: Retailer,
  retailerProducts: RetailerProducts,
  manufacturer: Manufacturer,
  media: Media,
  product: {
    category: Category,
    product: Product
  },
  user: {
    session: Session,
    user: User,
    contactAdvertisement: ContactAdvertisement
  }
};
