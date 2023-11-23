var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // Import the cors package
const bodyParser = require('body-parser');
require('./utils/mongodb')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var courseRouter = require('./routes/course');
var scheduleRouter = require('./routes/schedule');
var attendanceRouter = require('./routes/attendance');
var assignmentRouter = require('./routes/assignment');
var stuassignmentRouter = require('./routes/stuAssignment');
var logsRouter = require('./routes/logs');




var app = express();
app.use(bodyParser.json());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', authRouter);
app.use('/course', courseRouter);
app.use('/schedule', scheduleRouter);
app.use('/attendance', attendanceRouter);
app.use('/assignment', assignmentRouter);
app.use('/stuassignment', stuassignmentRouter);
app.use('/logs', logsRouter);

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


app.listen(() => {
  console.log(`Server is running on port 4000`);
});
module.exports = app;
