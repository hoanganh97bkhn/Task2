const mongoose = require ('mongoose');
const bcrypt = require ("bcrypt");

let Schema = mongoose.Schema;

let UserSchema = new Schema({
  userName : String,
  permissions : {type: String, default:"admin"},
  password : String,
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}

});
UserSchema.statics = {
  createNew(item) {
    return this.create(item);  
  },
  findByUserName(userName) {
    return this.findOne({"userName": userName}).exec();
  },
  findUserById(id) {
    return this.findById(id).exec();
  },
}

UserSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password, this.password)
  }
}

module.exports = mongoose.model("User",UserSchema);