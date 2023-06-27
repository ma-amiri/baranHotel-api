import  User  from "../models/User.model.js";
import { createError }   from "../utils/error.js";

 export const  register = async (req, res, next) => {
  try {
    const newUser = { ...req.body };

    await User.create(newUser);
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return next(createError(404, "User not found!"));

    // You can remove the password validation here since Auth0 handles it in the frontend.

    const { isAdmin, ...otherDetails } = user.dataValues;
    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
