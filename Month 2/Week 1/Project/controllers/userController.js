import fs from "fs";

export const getAllUsers = (req, res, next) => {
  res.send("All users");
};

export const getUser = (req, res, next) => {
  res.send("User");
};

export const createUser = (req, res, next) => {
  res.send("user created");
};

export const updateUser = (req, res, next) => {
  res.send("user updated");
};

export const deleteUser = (req, res, next) => {
  res.send("user deleted");
};
