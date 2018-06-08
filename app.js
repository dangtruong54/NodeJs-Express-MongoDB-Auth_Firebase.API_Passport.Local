var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout', 'backend');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sysConfig = require('./configs/system');

app.locals.sysConfig = sysConfig;

app.use(`/${sysConfig.systemAdmin}`, require('./routes/back-end/index'));
app.use('/', require('./routes/front-end/index'));

mongoose.connect('mongodb://truongdx:thaibinh1991@ds229435.mlab.com:29435/nodejs_trainning');
var db = mongoose.connection;
db.on('error', () => {
  console.log('Connection error!');  
})
db.once('open', () => {
  console.log('Connection success!')
})

var kittySchema = mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });

console.log(silence.name);

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
