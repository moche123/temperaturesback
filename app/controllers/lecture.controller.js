const Lecture = require("../models/lecture.model.js");
const XLSX = require("xlsx");

// Create and Save a new Lecture
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a Lecture
//   const Lecture = new Lecture({
//     FECHA : req.body.FECHA,
//     TIEMPO : req.body.TIEMPO,
//     AMBIENTE1 : req.body.AMBIENTE1,
//     AMBIENTE2 : req.body.AMBIENTE2,
//     SENSOR1 : req.body.SENSOR1,
//     SENSOR2 : req.body.SENSOR2,
//     SENSOR3 : req.body.SENSOR3,
//     SENSOR4 : req.body.SENSOR4,
//     SENSOR5 : req.body.SENSOR5,
//     SENSOR6 : req.body.SENSOR6,
//     SENSOR7 : req.body.SENSOR7,
//     SENSOR8 : req.body.SENSOR8,
//     SENSOR9 : req.body.SENSOR9,
//     SENSOR10 : req.body.SENSOR10,
//     SENSOR11 : req.body.SENSOR11,
//     SENSOR12 : req.body.SENSOR12,
//     TYPE : req.body.type,
//   });

//   // Save Tutorial in the database
//   Lecture.create(tutorial, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     else res.send(data);
//   });
// };

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const lecture = req.query.lecture;

  Lecture.getAll(lecture, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lectures."
      });
    else res.send(data);
  });
};

// // Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Lecture.findById({from: req.query.from,to:req.query.to,type:req.query.type}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay lectura en ese rango`
        });
      } else {
        res.status(500).send({
          message: "Error mostrando lecturas"
        });
      }
    } else { 
      for (let i = 0; i < data.length; i++) {
        stateTC2 = 0;
        for (const key in data[i]) {
          if (key.includes('SENSOR') || key.includes('AMBIENTE')) {
            stateTC2 = stateTC2 + Number(data[i][key])/14 
    
          }
        }
        data[i]['AVG'] = stateTC2
        
      }
      res.send(data);
    }
  });
};
exports.findOneReports = (req, res) => {
  Lecture.findByLectorAndSensor({from: req.query.from,to:req.query.to,type:req.query.type,sensor:req.query.sensor}, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No hay lectura en ese rango`
        });
      } else {
        res.status(500).send({
          message: "Error mostrando lecturas"
        });
      }
    } else { 
      for (let i = 0; i < data.length; i++) {
        stateTC2 = 0;
        for (const key in data[i]) {
          if (key.includes('SENSOR') || key.includes('AMBIENTE')) {
            stateTC2 = stateTC2 + Number(data[i][key])/14 
    
          }
        }
        
      }
      res.send(data);
    }
  });
};
exports.downloadReports = (req, res) => {
  // console.log(req.body)
  // res.send(req.body)
  const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(req.body.info);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Correos");
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader("Content-Disposition", 'attachment; filename="correos.xlsx"');
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(excelBuffer);
};

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(
//     req.params.id,
//     new Tutorial(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Tutorial with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Tutorial with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   Tutorial.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials."
//       });
//     else res.send({ message: `All Tutorials were deleted successfully!` });
//   });
// };
