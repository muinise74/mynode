let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Router
let indexRouter = require('./routes/index');
let usersRouter01 = require('./routes/users');
let usersRouter02 = require('./routes/users02');
let usersRouter03 = require('./routes/users03');
let swtoolRouter = require('./routes/SwtoolRoute');
let fileUploadRouter = require('./routes/UploadRoute');
let usersRouter = require('./routes/UsersRoute');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter01);
app.use('/users02', usersRouter02);
app.use('/users03', usersRouter03);

app.use('/api/Swtool',swtoolRouter);
app.use('/api/upload',fileUploadRouter);
app.use('/api/register',usersRouter);
app.use('/api/LoginForm',usersRouter);

app.use(express.static("./uploads"));

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
