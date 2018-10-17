var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash = require('express-flash-notification');
const validator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');

const checkAuth = require('./middleware/authentication');

global.__base = __dirname + '/';
global.__base_configs = __base + '/app/configs';
global.__base_helper = __base + 'helper';
global.__base_schemas = __base + 'schemas';
global.__base_validates = __base + 'validates';
global.__base_controllers = __base + 'controllers';
global.__base_authentication = __base + 'middleware';

const mongoose = require('mongoose');
const sysDatabase = require(__base_configs + '/database');

mongoose.connect(`mongodb://${sysDatabase.username}:${sysDatabase.password}@ds229435.mlab.com:29435/${sysDatabase.database}`);
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
  secret: '456tndndm333',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash(app));

app.use(validator({
  customValidators : {
    validateStatus : (value1, value2) => {
      return value1 !== value2;
    }
  }
}));

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

const sysConfig = require(__base_configs + '/system');

app.locals.sysConfig = sysConfig;

app.use(`/${sysConfig.systemAdmin}`,checkAuth, require('./routes/back-end/index'));
app.use('/', require('./routes/front-end/index'));
app.use('/', require('./routes/api/index'));

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
