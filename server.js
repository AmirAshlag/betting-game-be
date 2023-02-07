require('dotenv').config(); // loads the .env file on the project's root - later available on process.env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { userRouter } = require('./routers/user-router');
const { betRouter } = require('./routers/bet-router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/bets', betRouter);

mongoose.set('strictQuery', true);
mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
mongoose.connect(process.env.MONGO_URI);

app.listen('8080', () => {
  console.log('listening on port 8080');
});
