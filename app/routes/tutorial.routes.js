module.exports = (app) => {
  const lecture = require("../controllers/lecture.controller.js");

  var router = require("express").Router();

  // // Create a new Lecture
  // router.post("/", lecture.create);

  // Retrieve all lecture
  router.get("/", lecture.findAll);

  // // Retrieve all published lecture
  // router.get("/published", lecture.findAllPublished);

  // // Retrieve a single Tutorial with id
  router.get("/ranges", lecture.findOne);
  router.get("/reports", lecture.findOneReports);
  router.post("/reports-download", lecture.downloadReports);

  // // Update a Tutorial with id
  // router.put("/:id", lecture.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", lecture.delete);

  // // Delete all lecture
  // router.delete("/", lecture.deleteAll);

  app.use("/.netlify/functions/index/api/lecture", router);
};
