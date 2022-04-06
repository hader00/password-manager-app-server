require("dotenv").config();
const express = require("express");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require("cors");
const xss = require('xss-clean');
const bodyParser = require('body-parser');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss())

const limit = rateLimit({
  max: 100,// max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
  message: 'Too many requests' // message to send
});
app.use('/api/password-manager', limit); // Setting limiter on specific route

const router = require("./app/routes/routes");
app.use('/api/password-manager', router);

const db = require("./app/models");
db.sequelize.sync();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get('/', (req, res) => {
  res.send(`Server is running on port ${PORT}.`);
})

app.get('/available',  (req, res) => {
  res.send({success: true});
})
