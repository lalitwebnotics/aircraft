require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-runtime"],
});
require('dotenv').config();
import app from './app';
// import seedAircraft from './app/aircraft/seed';
// import seedCertificate from './app/certificate/seed';
// import seedEngine from './app/engine/seed';
// import seedManufacturer from './app/manufacturer/seed';
// import seedMedia from './app/media/seed';
// import seedProduct from './app/product/seed';
// import seedUser from './app/user/seed';
import { queue } from './modules/utils';

switch ((process.env.APP_MODE || '').toLowerCase()) {
  case 'seed':
    /**
     * Seed application
     */
    app.connect().then(() => {
      app.seeded = {};
      return queue([
        seedMedia,
        seedCertificate,
        seedEngine,
        seedAircraft,
        seedManufacturer,
        seedProduct,
        seedUser
      ].map((seed) => () => seed(app))).then(() => {
        console.log('Seed complete');
        process.exit(0);
      });
    }).catch((err) => {
      console.log('App failed to seed');
      console.error(err);
    });
    break;
  default:
    /**
     * Start application
     */
    app.start().then(() => {
      console.log('App started...');
    }).catch((err) => {
      console.log('App failed to start');
      console.error(err);
    });
    break;
}
