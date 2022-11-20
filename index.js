const express = require("express");
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

(async function () {
  const newStudent = new Student({
    name: "rahul",
    usnID: "123",
    password: "123",
  });
  const student = await newStudent.save();
})();
