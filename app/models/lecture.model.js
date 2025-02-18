const sql = require("./db.js");

// constructor
const Lecture = function(lectureData) {
  this.FECHA = lectureData.FECHA;
  this.TIEMPO = lectureData.TIEMPO;
  this.AMBIENTE1 = lectureData.AMBIENTE1;
  this.AMBIENTE2 = lectureData.AMBIENTE2;
  this.SENSOR1 = lectureData.SENSOR1;
  this.SENSOR2 = lectureData.SENSOR2;
  this.SENSOR3 = lectureData.SENSOR3;
  this.SENSOR4 = lectureData.SENSOR4;
  this.SENSOR5 = lectureData.SENSOR5;
  this.SENSOR6 = lectureData.SENSOR6;
  this.SENSOR7 = lectureData.SENSOR7;
  this.SENSOR8 = lectureData.SENSOR8;
  this.SENSOR9 = lectureData.SENSOR9;
  this.SENSOR10 = lectureData.SENSOR10;
  this.SENSOR11 = lectureData.SENSOR11;
  this.SENSOR12 = lectureData.SENSOR12;
  this.TYPE = lectureData.type;
};

// Lecture.create = (newLecture, result) => {
//   sql.query(`
//     INSERT INTO ${newLecture.TYPE} (FECHA, TIEMPO, AMBIENTE1, AMBIENTE2, SENSOR1, SENSOR2, SENSOR3, SENSOR4, SENSOR5, SENSOR6, SENSOR7, SENSOR8, SENSOR9, SENSOR10, SENSOR11, SENSOR12)
//     VALUES ('${newLecture.FECHA}', '${newLecture.TIEMPO}', ${newLecture.AMBIENTE1}, ${newLecture.AMBIENTE2}, ${newLecture.SENSOR1}, ${newLecture.SENSOR2}, ${newLecture.SENSOR3}, ${newLecture.SENSOR4}, ${newLecture.SENSOR5}, ${newLecture.SENSOR6}, ${newLecture.SENSOR7}, ${newLecture.SENSOR8}, ${newLecture.SENSOR9}, ${newLecture.SENSOR10}, ${newLecture.SENSOR11}, ${newLecture.SENSOR12});
// `,  (err) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created lecture: ", {...newLecture });
//     result(null, {...newLecture });
//   });
// };

Lecture.findById = (data, result) => {
  sql.query(`SELECT * FROM ${data.type} WHERE FECHA BETWEEN '${data.from}' AND '${data.to}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Lecture.findByLectorAndSensor = (data, result) => {
  console.log(data)
  console.log(result)
  sql.query(`SELECT FECHA,TIEMPO,'${data.sensor}' as 'SENSOR',${data.sensor} as 'VALOR' FROM ${data.type} WHERE FECHA BETWEEN '${data.from}' AND '${data.to}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};



Lecture.getAll = (lecture, result) => {
  let query =`SELECT * FROM ${lecture}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("lectures: ", res);
    result(null, res);
  });
};

// Tutorial.getAllPublished = result => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Tutorial.updateById = (id, tutorial, result) => {
//   sql.query(
//     "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated tutorial: ", { id: id, ...tutorial });
//       result(null, { id: id, ...tutorial });
//     }
//   );
// };

// Tutorial.remove = (id, result) => {
//   sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };

// Tutorial.removeAll = result => {
//   sql.query("DELETE FROM tutorials", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

module.exports = Lecture;
