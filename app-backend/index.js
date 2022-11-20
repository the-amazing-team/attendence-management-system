const express = require("express");
const { markStudentPresentToday } = require("./database");

(async function () {
  const student = await markStudentPresentToday("something");
  console.log(student);
})();
