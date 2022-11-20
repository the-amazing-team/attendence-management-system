const express = require("express");
const { resetOutingForAll } = require("./database");

(async function () {
  const student = await resetOutingForAll();
  console.log(student);
})();
