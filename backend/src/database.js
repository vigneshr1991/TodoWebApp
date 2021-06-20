const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const dbURI = 'mongodb://localhost:27017/todos';

const connectDatabase = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = {
  connectDatabase
}


