const fs = require('fs')
const Post = require('../models/Post');
const Writer = require('../models/Writer');
const path = require('path');

module.exports = {
  async create(req, res) {
    const { headline, lead, message } = req.body
    const { writer_id } = req.headers;

    //get writer infos
    let writer = await Writer.findOne({ _id: writer_id }, { password: 0 });
    if(!writer) {
      res.status(404).json({ error: 'Could not find writer. Try to log in.'});
    }
    const post_image = req.files.find(x => x.fieldname === 'post_image');

    //pegar previous post
    let previous_post = await Post.findOne().sort({ _id: -1 });
    let previous_postID;

    if(!previous_post){
      previous_postID = null;
    } else {
      previous_postID = previous_post._id;
    }

    const post = await Post.create({
        headline,
        lead,
        writer_avatar: writer.writer_avatar,
        name: writer.name,
        email: writer.email,
        date_time: Date.now(),
        post_image: post_image.filename,
        message,
        next_post: null,
        previous_post: previous_postID,
    });

    if(previous_post) {
      previous_post.next_post = post._id;
      previous_post.save();
    }
    if(post) {
      return res.status(200).send();
    } else {
      res.status(500).json({ error: 'Could not create post. Try again later.'});
    }
  },


  async index(req, res) {
    const posts = await Post.find();
    return res.json(posts)
  },

  async showOne(req, res) {
    const { id } = req.params;
    if( id === undefined || id === null)
      return res.status(400).json(null);
    const post = await Post.findOne({ _id : id });
    return res.json(post)
  },


  async delete(req,res) {
    const { _id } = req.body;
    const postToDelete = await Post.findOne({ _id });

    //deletar imagem do servidor
    const imageToDelete = postToDelete.post_image;
    const imgPath = path.resolve(__dirname,'..','uploads') + '/' + imageToDelete;
    try {
      fs.unlinkSync(imgPath)
    } catch(err) {
      console.error(err)
    }

    //apontar previous post do próximo para previous post do deletado
    let nextPost = await Post.findOne({ _id: postToDelete.next_post })
    if(nextPost) {
      nextPost.previous_post = postToDelete.previous_post;
      nextPost.save()
    }

    //apontar next post do anterior para next post do deletado
    let previousPost = await Post.findOne({ _id : postToDelete.previous_post })
    if(previousPost) {
      previousPost.next_post = postToDelete.next_post;
      previousPost.save();
    }

    const post = await Post.deleteOne({ _id });
    if(post.deletedCount){
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Post not found'});
    }
  }
}