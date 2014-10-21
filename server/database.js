var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/memry_database');
module.exports = mongoose.model('Defs', {
  title: String,
  description: String,
  descriptionURL: String
});
