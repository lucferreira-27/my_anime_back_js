var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors = require("cors");
var backsRouter = require('./routes/backs');
var titlesRouter = require('./routes/titles');
var searchRouter = require('./routes/search');
var waybackRouter = require('./routes/wayback');
var samplesRouter = require('./routes/samples');

var db = require('./database/db')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/backs', backsRouter);
app.use('/titles', titlesRouter);

app.use('/search', searchRouter);
app.use('/wayback', waybackRouter);

app.use('/samples', samplesRouter);



db.sync({force: true}).then(() => {
  console.log(`Database ${process.env.DB_NAME} synced`)
  var backController = require('./database/controllers/backController');
  var testBacks = require('./database/test-backs.json')
  return Promise.all(testBacks.map((back) => backController.create(back)))
}).catch(err => {
  console.log(err)
})
app.listen(9000)// view engine setup

module.exports = app;
