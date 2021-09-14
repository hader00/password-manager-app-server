require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// todo handle cors
app.use(cors());

// Enable 'application/json' and 'application/x-www-form-urlencoded' content-type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/routes")(app);

app.get('/', (req, res) => {
  res.send("OK")
})

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

