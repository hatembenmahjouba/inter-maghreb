// import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
// import https from 'https';

import app from './app.js';

dotenv.config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.MONGO_URI;
mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successfull'.cyan.underline.bold));

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
// https
//   .createServer(
//     {
//       key: fs.readFileSync('key.pem'),
//       cert: fs.readFileSync('cert.pem'),
//     },
//     app
//   )
//   .listen(
//     PORT,
//     console.log(
//       `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
//         .bold
//     )
//   );

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
