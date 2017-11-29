var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/job', { useMongoClient: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;