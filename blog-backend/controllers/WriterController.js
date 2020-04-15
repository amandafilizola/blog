const Writer = require('../models/Writer');

module.exports = {

  async create() {
    const {
      writer_avatar,
      name,
      email,
    } = req.body;
    const post = await Writer.create({
      writer_avatar,
      name,
      email,
    })
  }

}