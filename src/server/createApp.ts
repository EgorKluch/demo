import express from 'express';
import cookiesMiddleware from 'universal-cookie-express';
import path from 'path';
import bodyParser from "body-parser";
import {initApi} from "#/server/api";

const createApp = () => {
  const app = express();

  app.use(cookiesMiddleware());

  app.use('/images', express.static(path.resolve(process.cwd(), 'assets/image')));
  app.use('/manifest', express.static(path.resolve(process.cwd(), 'assets/manifest')));
  app.use('/intl', express.static(path.resolve(process.cwd(), 'assets/intl')));
  app.use('/manifest.json', express.static(path.resolve(process.cwd(), 'assets/manifest/manifest.json')));

  app.use(bodyParser.json({limit: '1mb'}));

  initApi(app);

  return app;
};

export default createApp;
