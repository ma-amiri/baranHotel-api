import express from "express";
const router = express.Router();
import User from "../models/user1.model.js";

import {
  getUserById,
  createUser,
  changeUserInfo,
  deleteUserById,
  getAllUsers,
 
} from "./user1.repository.js";

router.get("/", async (reqest, response) => {
  try {
    const getAllUsers = await getAllUsers();
    return res.status(200).json(getAllUsers);
  } catch (error) {
    return next({ status: 404, message: error });
  }
});
//get users by id

router.get("/users/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const searchedUser = await getUserById(userId);
    return response.status(200).json(searchedUser);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/", async (request, response) => {
  const aUser = request.body;
  await createUser(aUser);
  response.status(201).json();
});

router.post("/register", async (request, response) => {
  const newUser = new User({
    name: request.body.name,
    email: request.body.email,
    password: request.body.password
  });
  const user = await newUser.save();
  response.status(201).json();
});


// router.post("/", async(req, res, next) => {
//     try {
//         const {body} =req;
//         const newUser = await createUser(body);
//         return res.send(newUser);
//     }catch (error) {
//         return next({status: 500, message: error})
//     }
// });


router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email, password: password });
  if (user) {
    const temp = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      id: user.id
    };
    response.send(user);
  } else {
    return response.status(400).json({ message: "Login failed" });
  }
  response.status(201).json();
});


router.put("/:id", async (request, response) => {
  const userId = request.params.id;
  const aUser = request.body;
  await changeUserInfo(userId, aUser);
  response.status(200).json();
});

router.delete("/:id", async (request, response, next) => {
  try {
    const UserId = request.params.id;
    await deleteUserById(UserId);
    response.status(200).json();
  } catch (error) {
    next(error);
  }
});

export default router;
