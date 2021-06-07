'use strict'

//import required libraries
let createError = require('http-errors');
let express = require('express');
var path = require("path");
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //use the html as a template engine
app.engine('html', require('ejs').renderFile);


//basic set ups
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/lib", express.static(path.join(__dirname, "./lib/")));
app.use("/js", express.static(path.join(__dirname, "./js/")));

// add routers
app.use('/cloudn', require('./cloudn'));
app.use('/graph', require('./graph'));




module.exports.app = app;
