const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000, DB_ADRESS = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DB_ADRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user = { _id: '643014e2334d11674c340a8d' };
    next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.listen(PORT, () => console.log('ok'));