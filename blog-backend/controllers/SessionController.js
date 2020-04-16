const Writer = require('../models/Writer');

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;

    const logged = await Writer.findOne({ email, password }, { password: 0})
    if(logged) {
      res.status(200).json({ id: logged.id });
    } else {
      res.status(401).json({ error: 'Unauthorized '});
    }
  },
}
