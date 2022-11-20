const express = require("express");
const { markStudentPresentToday } = require("./database");
const { getTodayDate } = require("./utils");

(async function () {
  markStudentPresentToday();
  const today = getTodayDate();
  console.log(today);
})();
