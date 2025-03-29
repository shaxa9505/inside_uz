const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
require("./config/db")();
const flash = require("connect-flash")
const session = require('express-session')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentsRouter = require("./routes/admin/students")
const coursesRouter = require("./routes/admin/courses")
const clientsRouter = require("./routes/admin/clients")
const networksRouter = require("./routes/admin/networks")

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(flash());


app.use('/', indexRouter);
app.use("/", studentsRouter)
app.use("/", clientsRouter)
app.use("/", networksRouter)
app.use("/admin", coursesRouter)
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack)
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
