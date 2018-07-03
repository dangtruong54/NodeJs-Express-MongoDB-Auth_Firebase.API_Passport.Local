var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const flash = require('express-flash-notification');
const session = require('express-session');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

mongoose.connect('mongodb://truongdx:thaibinh1991@ds229435.mlab.com:29435/nodejs_trainning');
var db = mongoose.connection;

db.on('error', () => {
  console.log('connected error!')
});
db.once('open', () => {
  console.log('Connected!');
})

var app = express();

app.use(cookieParser());
app.use(session({
  secret: '11111ww',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash(app));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'backend');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sysConfig = require('./configs/system');

app.locals.sysConfig = sysConfig;

app.use(`/${sysConfig.systemAdmin}`, require('./routes/back-end/index'));
app.use('/', require('./routes/front-end/index'));

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
  res.render('./page/error', {title : 'Error Page'});
});

module.exports = app;
