const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    headline: String,
    lead: String,
    writer_avatar: String,
    name: String,
    email: String,
    date_time: Date,
    post_image: String,
    message: String,
    next_post: String,
    previous_post: String
  },{
  toJSON: {
    virtuals:true
  }
})


PostSchema.virtual('avatar_url').get(function(){
  return `http://192.168.25.126:3333/uploads/${this.writer_avatar}`
});

PostSchema.virtual('image_url').get(function(){
  return `http://192.168.25.126:3333/uploads/${this.post_image}`
});

module.exports = mongoose.model('Post', PostSchema )