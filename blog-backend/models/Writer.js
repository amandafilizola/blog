const mongoose = require('mongoose');

const WriterSchema = new mongoose.Schema({
    writer_avatar: String,
    name: String,
    email: String,
    password: String
  },{
  toJSON: {
    virtuals:true
  }
})

WriterSchema.virtual('avatar_url').get(function(){
  return `http://192.168.25.126:3333/files/avatars/${this.writer_avatar}`
});

module.exports = mongoose.model('Writer', WriterSchema )