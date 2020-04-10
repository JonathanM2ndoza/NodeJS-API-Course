const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const { info, error } = require('./modules/log');

const app = express();
const port = process.env.PORT || 3000;

// ENV
dotenv.config();

// BD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => info('mongoDB, Atlas. Connected'))
    .catch((err) => error(err));

// Middleware
app.use(morgan('dev'));

app.listen(port, () => {
    info(`A NodeJS API is listining on port: ${port}`);
});