const mongoose = require("mongoose");
const Student = require("./models/Student");
require("dotenv").config();

const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

mongoose.connect(
  MONGODB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("[+] MongoDB Conencted!");
  }
);

async function addNewStudent({ name, usnID, password }) {
  const newStudent = new Student({
    name: name,
    usnID: usnID,
    password: password,
  });
  const student = await newStudent.save();
  console.log(`[+] ${name} has been added to the database.`);
  return student;
}

function findStudent(usnID) {
  return new Promise((resolve, reject) => {
    Student.findOne({ usnID: "something" }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
}

async function markStudentPresentToday(usnID) {
  const today = new Date();
  const student = await findStudent(usnID);
  console.log(student);
}

module.exports = { addNewStudent, markStudentPresentToday };
