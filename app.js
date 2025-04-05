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


app.use(function (req, res, next) {
  const createError = require('http-errors');
  next(createError(404)); // передаём ошибку дальше
});

// 🎯 Обработчик всех ошибок, в том числе 404
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);

  if (err.status === 404) {
    return res.status(404).render('404'); // <-- вот тут 404.pug
  }

  res.status(err.status || 500);
  res.render('error'); // <-- вот тут error.pug
});

// app.use(function (err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   console.error(err.stack);

//   // если это ошибка 404 — показать кастомную страницу
//   if (err.status === 404) {
//     return res.status(404).render('404');
//   }

//   // иначе стандартная ошибка
//   res.status(err.status || 500);
//   res.render('error');
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   console.error(err.stack)
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
