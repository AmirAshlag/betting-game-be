require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { userRouter } = require('./routers/user-router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

mongoose.set('strictQuery', true);
mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.ygfekoj.mongodb.net/?retryWrites=true&w=majority'
);

app.listen('8080', () => {
  console.log('listening on port 8080');
});
