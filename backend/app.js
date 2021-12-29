import createError from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { MongoClient } from 'mongodb'
import { mongoUrl } from './mongoUrl.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import c1routes from './routes/c1.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new MongoClient(mongoUrl);
async function connect() {
  // Connect the client to the server
  await client.connect();
  // Establish and verify connection
  await client.db("admin").command({ ping: 1 });
  console.log("Connected successfully to server");
}

await connect();
const database = client.db('SpadeTesting');
export const c1col = database.collection('c1');

var app = express();

app.use('/c1', c1routes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
//app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;