const express = require("express");
const cors = require("cors");
const {
  addNewStudent,
  isStudentExist,
  isStudentPresentToday,
  markStudentPresentToday,
  getOutingList,
  resetOutingForAll,
  findStudent,
  setSessionID,
  resetSessionID,
} = require("./database");
const { generateUUID } = require("./utils");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register_new_student", async (req, res) => {
  const name = req.query.name;
  const usnID = req.query.usnID;
  const password = req.query.password;

  const isStudentAlreadyExist = await isStudentExist(usnID);
  if (isStudentAlreadyExist) {
    res.send({
      status: "already_exists",
      message: "Student already exist!",
    });

    return false;
  }

  await addNewStudent({
    name: name,
    usnID: usnID,
    password: password,
  });

  res.send({
    status: "created",
    message: "Account has been created!",
  });
});

app.get("/mark_present", async (req, res) => {
  const usnID = req.query.usnID;
  const isAlreadyPresent = await isStudentPresentToday(usnID);
  if (isAlreadyPresent) {
    res.send({
      status: "already_present",
      message: "Student is already marked present today.",
    });
    return false;
  }
  await markStudentPresentToday(usnID);
  res.send({
    status: "marked_present",
    message: "Student has been marked present today!",
  });
});

app.get("/get_outing_list", async (req, res) => {
  const outingListDocuments = await getOutingList();
  const outingList = [];
  outingListDocuments.forEach((document) => {
    outingList.push({
      name: document.name,
      usnID: document.usnID,
    });
  });
  res.send(outingList);
});

app.get("/reset_outing_for_all", async (req, res) => {
  await resetOutingForAll();
  res.send({
    status: "done",
    message: "Outing is reset for all successfully!",
  });
});

app.get("/get_student_detail", async (req, res) => {
  const usnID = req.query.usnID;
  const student = await findStudent(usnID);
  res.send(student);
});

app.get("/login", async (req, res) => {
  const usnID = req.query.usnID;
  const password = req.query.password;
  const student = await findStudent(usnID);
  const actualPassword = student.password;
  // if (student.sessionID !== null) {
  //   res.send({
  //     status: "session_already_open",
  //     message: "Please log out from your previous device",
  //   });
  //   return false;
  // }
  if (password !== actualPassword) {
    res.send({
      status: "unauthorized",
      message: "Either usnID or password is wrong",
    });
    return false;
  }
  const newSessionId = generateUUID();
  await setSessionID(usnID, newSessionId);
  res.send({
    status: "authorized",
    message: "You have been authorized",
    sessionID: newSessionId,
  });
});

app.get("/logout", async (req, res) => {
  const usnID = req.query.usnID;
  const sessionID = req.query.sessionID;
  const student = await findStudent(usnID);
  const actualSessionId = student.sessionID;
  if (sessionID != actualSessionId) {
    res.send({
      status: "unauthorized",
      message: "You are unauthorized to logout.",
    });
    return false;
  }
  await resetSessionID(usnID);
  res.send({
    status: "logout",
    message: "You have been logged out.",
  });
});

app.listen(PORT, () => {
  console.log(`[+] Server is running on the port ${PORT}`);
});
