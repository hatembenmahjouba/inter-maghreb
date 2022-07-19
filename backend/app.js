import path from 'path';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

import api from './routes/api.js';
import AppError from './utils/appError.js';
import { globalErrorHandler } from './controllers/errorController.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.enable('trust proxy');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/backend/views'));
app.use(cors());
app.options('*', cors());

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      'name',
      'countInStock',
      'brand',
      'price',
      'rating',
      'numReviews',
      'email',
      '_id',
    ],
  })
);

app.use(compression());

app.use('/api/v1/', api);
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
