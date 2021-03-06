const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser')

const ErrorResponse = require('./server/middlewares/ErrorResponse');

const app = express();
dotenv.config({ path: './server/config/.env' });

const connectDB = require('./server/config/db'); // load database
const errorHandler = require('./server/middlewares/errorHandler');

// 1) Global MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 190,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser())
connectDB();

// 3) ROUTES
app.use('/api/v1/auth', require('./server/routes/authRoutes'));
app.use('/api/v1/category', require('./server/routes/categoryRoutes'));
app.use('/api/v1/subcategory', require('./server/routes/subcategoryRoutes'))

app.all('*', (req, res, next) => {
  next(new ErrorResponse(` Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold
  );
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'.bgWhite.red);
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 💥 Shutting down...'.red);
  console.log(err);
});