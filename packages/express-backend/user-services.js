//user-services.js
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

export function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

export function findUserById(id) {
  return userModel.findById(id);
}

export function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

export function findUserByName(name) {
  return userModel.find({ name: name });
}

export function findUserByJob(job) {
  return userModel.find({ job: job });
}

export function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export function findUserByNameAndJob(name, job) {
  return userModel.find({ name, job });
}

export const findUserByUsername = (username) => {
  return userModel.findOne({ username });
};

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
  findUserByUsername,
};
