const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/contest";
const connectMongo = () => {
 // Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
};

module.exports = {connectMongo};