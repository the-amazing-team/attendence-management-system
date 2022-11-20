const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  usnID: String,
  password: String,
  isOuting: Boolean,
  sessionID: String,
  presentDates: Array,
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
