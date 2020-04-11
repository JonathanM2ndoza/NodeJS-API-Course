const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const { info, error } = require('./modules/log');
const { usersRoutes } = require('./routes/v1/user.routes');
const { productsRoutes } = require('./routes/v1/product.routes');

const app = express();
const port = process.env.PORT || 3000;

// ENV
dotenv.config();

// BD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        info('Mongo DB Atlas. Connected');
        app.listen(port, () => {
            info(`NodeJS API listining on port: ${port}`);
        });
    })
    .catch((err) => error(err));

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Middleware
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/api/v1', usersRoutes);
app.use('/api/v1', productsRoutes);