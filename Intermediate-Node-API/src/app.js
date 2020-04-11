const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const { info, error } = require('./modules/log');
const { usersRoutes } = require('./routes/v1/users.routes');

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
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/api/v1', usersRoutes);

app.listen(port, () => {
    info(`A NodeJS API is listining on port: ${port}`);
});