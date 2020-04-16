const fs = require('fs')
const path = require('path');
const Writer = require('../models/Writer');

module.exports = {

  async create(req, res) {
    const {
      name,
      email,
    } = req.body;

    const writer_avatar = req.files.find(x => x.fieldname === 'writer_avatar');
    const post = await Writer.create({
      writer_avatar: writer_avatar.filename,
      name,
      email,
    })

    if(post) {
      return res.status(200).send();
    } else {
      res.status(500).json({ error: 'Could not create writer profile. Try again later.'});
    }
  },

  async showOne(req, res) {
    const { id } = req.params;
    const writer = await Writer.findOne({ _id : id });
    return res.json(writer)
  },

  async index(req, res) {
    const writers = await Writer.find();
    return res.json(writers)
  },

  async delete(req,res) {
    const { _id } = req.body;
    const writerToDelete = await Writer.findOne({ _id });

    //deletar imagem do servidor
    const imageToDelete = writerToDelete.writer_avatar;
    const imgPath = path.resolve(__dirname,'..','uploads') + '/' + imageToDelete;

    try {
      fs.unlinkSync(imgPath)
    } catch(err) {
      console.error(err)
    }

    const post = await Writer.deleteOne({ _id });
    if(post.deletedCount){
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Writer not found'});
    }
  }

}