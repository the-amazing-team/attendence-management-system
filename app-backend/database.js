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
    console.log("[+] MongoDB Connected!");
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

async function isStudentExist(usnID) {
  const matches = await findStudent(usnID);
  if (!matches) return false;
  return true;
}

async function addNewStudent({ name, usnID, password }) {
  if (await isStudentExist(usnID))
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
  if (!student) return new Error("Student does not exist!");
  let isDateFound = false;
  student.presentDates.forEach((date) => {
    const dateInstance = new Date(date);
    const simpleDate = convertDateInstanceToNormalDate(dateInstance);
    if (simpleDate == simpleTodayDate) {
      isDateFound = true;
      return false;
    }
  });
  return isDateFound;
}

async function markStudentPresentToday(usnID) {
  const isPresentToday = await isStudentPresentToday(usnID);
  console.log(isPresentToday);
  if (isPresentToday) return new Error("Student is already present");
  const today = new Date();
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      $push: {
        presentDates: today,
      },
    }
  );
  const student = await findStudent(usnID);
  console.log(`[+] ${student.name} has been marked present`);
  return result;
}

async function applyForOuting(usnID) {
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      isOuting: true,
    }
  );
  const student = await findStudent(usnID);
  console.log(`[+] ${student.name} has been applied for outing`);
  return result;
}

async function resetOuting(usnID) {
  const result = await Student.updateOne(
    { usnID: usnID },
    {
      isOuting: false,
    }
  );
  const student = await findStudent(usnID);
  console.log(`[+] ${student.name} has reset outing`);
  return result;
}

async function resetOutingForAll() {
  const result = await Student.updateOne(
    {},
    {
      isOuting: false,
    }
  );
  console.log(`[+] Outing for everyone has been reset`);
  return result;
}

module.exports = {
  addNewStudent,
  markStudentPresentToday,
  applyForOuting,
  resetOuting,
  resetOutingForAll,
  isStudentExist,
  isStudentPresentToday,
};
