import express from 'express';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.addMiddlewares();
    this.addRoutes();
  }

  addMiddlewares() {
    this.server.use(express.json());
  }

  addRoutes() {
    this.server.use(routes);
  }
}

export default new App().server;
