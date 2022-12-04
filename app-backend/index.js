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

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/register_new_student", async (req, res) => {
  const name = req.query.name;
  const usnID = req.query.usnID;
  const password = req.query.password;

  if (name == null || usnID == null || password == null) {
    res.send({
      status: "field_missing",
      message: "name, usnID or password is misisng.",
    });
    return false;
  }

  if (name == "" || usnID == "" || password == "") {
    res.send({
      status: "field_missing",
      message: "Length of name or usnID or password is greater than 0",
    });
    return false;
  }

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

  if (usnID == null) {
    res.send({
      status: "field_missing",
      message: "usnID is missing",
    });
    return false;
  }

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

  if (usnID == null) {
    res.send({
      status: "field_missing",
      message: "One of the fields are missing",
    });
    return false;
  }

  if (usnID == "") {
    res.send({
      status: "field_missing",
      message: "Length of usnID is greater than 0",
    });
    return false;
  }

  const student = await findStudent(usnID);
  res.send(student);
});

app.get("/login", async (req, res) => {
  const usnID = req.query.usnID;
  const password = req.query.password;

  if (usnID == null || password == null) {
    res.send({
      status: "field_missing",
      message: "usnID or password is missing.",
    });
    return false;
  }

  if (usnID == "" || password == "") {
    res.send({
      status: "field_missing",
      message: "Length of usnID or password is greater than 0",
    });
    return false;
  }

  const student = await findStudent(usnID);
  if (student == null) {
    res.send({
      status: "user_not_found",
      message: "No user exists with this usnID",
    });
    return false;
  }

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
  if (usnID == null || sessionID == null) {
    res.send({
      status: "field_missing",
      message: "usnID or sessionID is missing.",
    });
    return false;
  }

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
