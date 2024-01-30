const mongoose = require('mongoose');
const { Schema } = mongoose;
// Error was coming when use required ,unique properties on schema so i removed those properties
const UserSchema = new Schema({
  phoneNo: {type :String,unique : true} ,
  email: {type :String,unique : true},
  password: String,
  date: { type: Date, default: Date.now },
  userType : String
  });
  const User = mongoose.model('user', UserSchema);
  User.createIndexes();
  module.exports = User;