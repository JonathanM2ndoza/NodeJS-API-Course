const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { routerPosts } = require('./routes/posts');

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Middleware
app.use(morgan('dev'));

app.use('/', routerPosts);

app.listen(port, () => {
    console.log(`A NodeJS API is listining on port: ${port}`);
});