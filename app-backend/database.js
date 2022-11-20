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

function findStudent(usnID) {
  return new Promise((resolve, reject) => {
    Student.findOne({ usnID: usnID }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
}

function isStudentExist(usnID) {
  if (!findStudent(usnID)) return false;
  return true;
}

async function addNewStudent({ name, usnID, password }) {
  if (isStudentExist(usnID))
    return new Error("Student with this USN ID already exists");
  const newStudent = new Student({
    name: name,
    usnID: usnID,
    password: password,
    isOuting: false,
  });
  const student = await newStudent.save();
  console.log(`[+] ${name} has been added to the database.`);
  return student;
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
  if (isStudentPresentToday(usnID))
    return new Error("Student is already present");
  const today = new Date();
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      $push: {
        presentDates: today,
      },
    }
  );
  return result;
}

async function applyForOuting(usnID) {
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      isOuting: true,
    }
  );
  return result;
}

async function resetOuting(usnID) {
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      isOuting: false,
    }
  );
  return result;
}

async function resetOutingForAll() {
  const result = await Student.updateOne(
    {},
    {
      isOuting: false,
    }
  );
  return result;
}

module.exports = {
  addNewStudent,
  markStudentPresentToday,
  applyForOuting,
  resetOuting,
  resetOutingForAll,
};
