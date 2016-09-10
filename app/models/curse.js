
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CurseSchema   = new Schema({
  name: String
});

module.exports = mongoose.model('Curse', CurseSchema);