import User from "../models/user1.model.js";
import { Op } from "sequelize";

async function getAllUsers() {
  return await User.findAll();
}

async function getUserById(pUserId) {
  return await User.findByPk(pUserId);
}

async function getUserBySsn(pUserSsn) {
  return await User.findOne({
    where: {
      ssn: pUserSsn
    }
  });
}

async function createUser(pUser) {
  await User.create(pUser);
}

async function changeUserInfo(pUserId, pUser) {
  await User.update(pUser, {
    where: {
      id: pUserId
    }
  });
}
async function deleteUserById(pUserId) {
  await User.destroy({
    where: {
      id: pUserId
    }
  });
}

async function setUserActive(pUserId, pActiveFlag) {
  const User = awaitUser.findByPk(pUserId);
  User.active = pActiveFlag;
  await User.save();
}

export {
  getUserById,
  createUser,
  changeUserInfo,
  deleteUserById,
  getAllUsers,
  getUserBySsn,
  setUserActive
};
