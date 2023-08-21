var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

var indexRouter = require('./routes/index');
var flightsRouter = require('./routes/flights');
var destinationRouter = require('./routes/destination');
var ticketRouter = require('./routes/ticket');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))

app.use('/', indexRouter);
app.use('/flights', flightsRouter);
app.use('/', destinationRouter);
app.use('/', ticketRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {title: "Error"});
});

module.exports = app;
