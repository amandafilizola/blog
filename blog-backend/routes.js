const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');

const routes = express.Router();
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);




routes.post('/posts', upload.any(), PostController.create)
routes.get('/posts', PostController.index)
routes.delete('/posts', PostController.delete)


module.exports = routes;