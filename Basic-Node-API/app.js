const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const { postRoutes } = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// BD
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB, Atlas. Connected'))
    .catch((err) => console.error(err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

// Routes
app.use('/api/v1', postRoutes);

app.listen(port, () => {
    console.log(`A NodeJS API is listining on port: ${port}`);
});