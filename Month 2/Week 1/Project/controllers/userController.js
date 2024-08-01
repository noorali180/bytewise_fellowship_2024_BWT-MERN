const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/users_data.json`, "utf-8")
);

exports.getAllUsers = (req, res, next) => {
  if (!users.length)
    return res.status(404).json({
      status: "failed",
      message: "no users found",
    });

  res.status(200).json({
    status: "success",
    message: "all users fetched",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  const user = users.find((user) => +user.id === +id);

  if (!user)
    return res.status(400).json({
      status: "fail",
      message: "no user found with this id",
    });

  res.status(200).json({
    status: "success",
    message: "user found",
    data: {
      user,
    },
  });
};

exports.createUser = (req, res, next) => {
  const { first_name, last_name, email, gender } = req.body;

  if (!first_name || !last_name || !email || !gender)
    return res.status(400).json({
      status: "fail",
      message:
        "you have missed one of the required field {first_name, last_name, email, gender}",
    });

  const id = uuid();
  const created_at = new IntlDateFormat(Date.now());

  console.log(id);
  console.log(created_at);

  const newUser = {
    id,
    first_name,
    last_name,
    email,
    gender,
    created_at,
  };

  res.status(201).json({
    status: "success",
    message: "new user created",
    data: {
      newUser,
    },
  });
};

exports.updateUser = (req, res, next) => {
  res.send("user updated");
};

exports.deleteUser = (req, res, next) => {
  res.send("user deleted");
};
