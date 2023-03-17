var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateCredentialsRouter = require('./routes/validateCredentials');
var getProductDetailsRouter = require('./routes/getProductDetails');
var newUSerSignUPRouter = require('./routes/newUserSignUp');
var addProductRouter = require('./routes/uploadProduct');
var addImageRouter = require('./routes/uploadFile');
var signOutUserRouter = require('./routes/signOutUser')

var app = express();
app.set('trust Proxy', 1);
app.use(session({
  resave: false,
  secret: 'keyboard cat',
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/userCredentials',validateCredentialsRouter);
app.use('/get/productDetails',getProductDetailsRouter);
app.use('/new/user/signUp',newUSerSignUPRouter);
app.use('/add/new/Product',addProductRouter);
app.use('/add/new/Image',addImageRouter);
app.use('/user/signout',signOutUserRouter);

app.listen(8081,()=>{
  console.log("server is listening at 8081")
});
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
