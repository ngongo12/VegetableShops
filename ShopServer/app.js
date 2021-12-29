var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var indexRoute = require('./routes/index');
var usersRoute = require('./routes/users');
var categoriesRoute = require('./routes/categories');
var productsRoute = require('./routes/products');
var orderRoute = require('./routes/orders');
var notificationRoute = require('./routes/notification');
var socketRoute = require('./routes/socket');
var contactRoute = require('./routes/contact');
var messageRoute = require('./routes/message');

//mongo
const mongoose = require('mongoose');


//mongodb connect
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('>>>>>Database connected<<<<<<'))
.catch((e) => console.log('>>>>>Database connect error: ', e));

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/orders', orderRoute);
app.use('/notification', notificationRoute);
app.use('/chatSocket', socketRoute);
app.use('/contact', contactRoute);
app.use('/message', messageRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
