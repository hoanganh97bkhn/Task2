const mongoose = require('mongoose');
const bluebird = require('bluebird');

/**
 * Connect to MongoDB
 */
2
  let connectDB = () => {
   mongoose.Promise = bluebird;

  //mongodb://localhost:27017/awesome_chat
  let URI = `mongodb://localhost:27017/TTS_TASK_1`;
  
  return mongoose.connect(URI, {userMongoClient:true});
 };

 module.exports = connectDB;