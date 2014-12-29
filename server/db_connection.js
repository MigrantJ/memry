'use strict';
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/memry_database');

module.exports = mongoose;