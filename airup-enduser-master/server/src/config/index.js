import { merge } from 'lodash';
import {join} from 'path';
import pkg from '../../package.json';
import local from './local';
import dotenv from "dotenv";

dotenv.config({ path: join(__dirname,'../../.env') });

/**
 * Configuration
 */
export default merge({
  app: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '8001',
    version: process.env.VERSION || pkg.version,
    url: process.env.URL || 'http://aircraftupgrade.com/',
    database: {
      mongodb: {
        url: process.env.MONGODB_URL || 'mongodb+srv://aircraft-dev:vM9Jyj4nSpA63dCVhPxt@cluster0.dtwwj.mongodb.net/aircraft?retryWrites=true&w=majority',
        options: {
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      }
    },
    api: {
      // Refresh token every 10 minutes
      refresh: 60 * 10
    },
    cors: {
      exposedHeaders: 'Authorization'
    },
    mail: {
      providers: {
        mailjet: {
          apiKey: 'f7256f8753111427cfb7e59197dd2a15',
          secretKey: '8feb30a08674f683e80996382d904e7a',
          version: 'v3.1'
        }
      },
      sender: {
        email: 'hello@homesdavao.com',
        name: 'Aircraft Upgrade'
      }
    }
  }
}, local);
