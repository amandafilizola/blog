const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


mongoose.connect('mongodb+srv://blog:blog@cluster0-pfp1o.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname,'uploads')));
app.use(routes);

app.listen(3333);