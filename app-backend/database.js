const mongoose = require("mongoose");
const Student = require("./models/Student");
const { convertDateInstanceToNormalDate } = require("./utils");
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
    Student.findOne({ usnID: usnID }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
}

async function isStudentPresentToday(usnID) {
  const today = new Date();
  const simpleTodayDate = convertDateInstanceToNormalDate(today);
  const student = await findStudent(usnID);
  let isTodayFound = false;
  student.presentDates.forEach((date) => {
    const dateInstance = new Date(date);
    const simpleDate = convertDateInstanceToNormalDate(dateInstance);
    if (simpleDate == simpleTodayDate) {
      isTodayFound = true;
      return false;
    }
  });
  return isTodayFound;
}

async function markStudentPresentToday(usnID) {
  if (isStudentPresentToday(usnID)) return false;
  const today = new Date();
  const student = await Student.updateOne(
    { usnID: usnID },
    {
      $push: {
        presentDates: today,
      },
    }
  );
  return student;
}

module.exports = { addNewStudent, markStudentPresentToday };
