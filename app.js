const express = require('express');
const indexRoute = require('./src/routes/index.js');

const app = express();

app.get('/', indexRoute);

app.listen(8000);
