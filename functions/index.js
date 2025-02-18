const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */

const cors = require("cors");
var serverless = require("serverless-http");
var router = express.Router();

const app = express();

var corsOptions = {
  // origin: "http://localhost:8081"
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/.netlify/functions/index", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// app.use("/.netlify/functions/index/api/lecture", router);
// app.use("/.netlify/functions/index/api/lecture", router);
// router.get("/.netlify/functions/index", lecture.findAll);

// // Retrieve all published lecture
// router.get("/published", lecture.findAllPublished);

// // Retrieve a single Tutorial with id
// router.get("/.netlify/functions/index/ranges", lecture.findOne);
// router.get("/.netlify/functions/index/reports", lecture.findOneReports);
// router.post(
//   "/.netlify/functions/index/reports-download",
//   lecture.downloadReports
// );
require("../app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// Export the handler for serverless deployment
module.exports.handler = serverless(app);
