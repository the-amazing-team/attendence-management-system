const express = require("express");
const { markStudentPresentToday } = require("./database");
const { getTodayDate } = require("./utils");

(async function () {
  const today = getTodayDate();
  console.log(today);
})();
