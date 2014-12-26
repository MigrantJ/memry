'use strict';
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/memry_database');

var schema = mongoose.Schema({
  title: String,
  description: String,
  descriptionURL: String
});

module.exports = mongoose.model('Def', schema);
