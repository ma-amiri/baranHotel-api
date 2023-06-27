import  User  from "../models/User.model.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.status(200).json(updatedUser[1][0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
