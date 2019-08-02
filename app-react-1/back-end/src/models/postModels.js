const mongoose = require ('mongoose');
const bcrypt = require ("bcrypt");

let Schema = mongoose.Schema;

let PostSchema = new Schema({
  name: String,
  description : String,
  price : String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  path : String,
  imageUrl : String,
  model: Number,
  good : Number,
  utilities : Array,
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},

});
PostSchema.statics = {
  createNew(item) {
    return this.create(item);  
  },
  findByAuthor(userName) {
    return this.findOne({"userName": userName}).exec();
  },
  findPostById(id){
    return this.findById(id).exec();
  },
  findIdAndUpdate(id, name, description, price, utilities, path, imageUrl, updatedAt){
    return this.findByIdAndUpdate(
      id,
      { "name" : name,
        "description" : description,
        "price" : price,
        "utilities" : utilities,
        "path" : path,
        "imageUrl" : imageUrl,
        "updatedAt" : updatedAt 
      }
    ).exec()
  },
  findIdAndRemove(id){
    return this.findOneAndRemove({'_id' : id}).exec();
  }
}

PostSchema.methods = {
  comparePassword(password){
    return bcrypt.compare(password, this.local.password)
  }
}

module.exports = mongoose.model("post",PostSchema);