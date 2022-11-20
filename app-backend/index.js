const express = require("express");
const { addNewStudent } = require("./database");

(async function () {
  const student = await addNewStudent({
    name: "rahul",
    password: "something",
    usnID: "something",
  });
  console.log(student);
})();
