require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./app/routes/routes");
app.use('/api/password-manager', router);

const db = require("./app/models");
db.sequelize.sync();

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.info(`Server is running on port ${process.env.NODE_LOCAL_PORT}.`);
});

app.get('/', (req, res) => {
  res.send(`Server is running on port ${process.env.NODE_LOCAL_PORT}.`);
})

app.get('/available',  (req, res) => {
  res.send({success: true});
})
