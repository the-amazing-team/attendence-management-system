const express = require("express");
const { addNewStudent, isStudentExist } = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`[+] Server is running on the port ${PORT}`);
});
