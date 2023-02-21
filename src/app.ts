import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import userRoutes from './v1/routes/userRoutes';
import authRoutes from './v1/routes/authRoutes';
import { appConfig } from './config/config';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start(appConfig.port);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }

  private routes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use('/api', authRoutes);
  }
  private start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

export default new App().app;