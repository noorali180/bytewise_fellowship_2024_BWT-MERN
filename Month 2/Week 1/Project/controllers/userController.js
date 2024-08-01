const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const dateFormatter = require("date-format");

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
  const user = users.find((user) => String(user.id) === String(id));

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

  const id = uuidv4();
  const created_at = dateFormatter("dd:MM:yyyy", new Date()).replaceAll(
    ":",
    "/"
  );

  const newUser = {
    id,
    first_name,
    last_name,
    email,
    gender,
    created_at,
  };

  users.push(newUser);

  fs.writeFileSync(
    `${__dirname}/../data/users_data.json`,
    JSON.stringify(users)
  );

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
  const { id } = req.params;
  const userIndex = users.findIndex((user) => String(user.id) === String(id));

  if (!users[userIndex])
    return res.status(404).json({
      status: "fail",
      message: "User not found with that id",
    });

  users.splice(userIndex, 1);

  fs.writeFileSync(
    `${__dirname}/../data/users_data.json`,
    JSON.stringify(users)
  );

  res.status(200).json({
    status: "success",
    message: "user deleted successfully",
    data: null,
  });
};
