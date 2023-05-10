import express, { Express, Router } from 'express';
import errorHandler from '../modules/shared/middlewares/errorHandler';
import morgan from 'morgan';

class App {
  public app: Express;

  constructor(router: Router) {
    this.app = express();
    this.InitializeMiddlewares();
    this.InitializeRoutes(router);
    this.InitializeErrorHandling();
  }

  public get getServer() {
    return this.app;
  }

  private InitializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('tiny'));
  }

  private InitializeRoutes(router: Router) {
    this.app.use('/api', router);
    this.app.use('/health', (req, res) => {
      res.status(200).json({
        success: true,
      });
    });
  }

  private InitializeErrorHandling() {
    this.app.use(errorHandler);
  }
}

export default App;
