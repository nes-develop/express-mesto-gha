require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const setErrors = require('./middlewares/setErrors');
const router = require('./routes/allRoutes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(router);
app.use(errors());
app.use(setErrors);

mongoose.connect('mongodb://localhost/mestodb')
  .then(app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  }))
  .catch((err) => console.log(err));
