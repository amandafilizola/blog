const express = require('express');
const multer = require('multer');
const PostController = require('./controllers/PostController');
const WriterController = require('./controllers/WriterController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);




routes.post('/posts', upload.any(), PostController.create)
routes.get('/posts', PostController.index)
routes.get('/posts/:id', PostController.showOne)
routes.delete('/posts', PostController.delete)

routes.post('/writers', upload.any(), WriterController.create)
routes.get('/writers', WriterController.index)
routes.get('/writers/:id', WriterController.showOne)
routes.delete('/writers', WriterController.delete)

routes.post('/login', SessionController.login)


module.exports = routes;