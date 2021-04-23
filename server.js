const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config/db.config");
const api = require("./routes/routes")
const { handleError } = require('./services/errorHandler');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

//DB configuration
mongoose
  .connect(config.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//routing
app.use('/api', api);
app.use((err, req, res, next) => {
  handleError(err, req, res);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});