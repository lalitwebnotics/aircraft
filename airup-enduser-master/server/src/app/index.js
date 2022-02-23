import Application from '../modules/Application';
import config from '../config';
import controllers from './controllers';
import mailers from './mailers';
import middleware from './middleware';
import models from './models';
import routes from './routes';
import templates from './templates';
import validators from './validators';

const app = new Application(config.app)
  .controllers(controllers)
  .mailers(mailers)
  .middleware(middleware)
  .models(models)
  .routes(routes)
  .templates(templates)
  .validators(validators);

export default app;
