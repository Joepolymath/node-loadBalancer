const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();

const PORT = 3002;

app.use(morgan('dev'));

app.get('/app', (req, res) => {
  res.send(`Hello World! Host: ${process.env.HOSTNAME}`);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port: ${PORT}`);
});
