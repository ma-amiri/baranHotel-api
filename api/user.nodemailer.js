import User from "../model/customer-model.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "masumeh.amiri@hicoders.ch",
    pass: process.env.GMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
  ignoreTLS: true,
});


const getAllUser = async () => {
  const user = await User.findAll();
  return user;
};

const createUser = async (pUser) => {
  try {
     // Check if user with provided email already exists
     const existingUser = await User.findOne({ where: { email: pUser.email } });
     if (existingUser) {
       throw new Error('User with this email already exists');
     }
     // Create new user if email does not exist
    const newUser = await User.create(pUser);

    const emailOptions = {
      from: "masumeh.amiri@hicoders.ch",
      to: pUser.email,
      subject: "Hello",
      html: "Welcome ",
    };
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("hello");
        console.error(err);
      } else console.log(info);
    });
    return newUser;
  }catch (error) {
    throw new Error('error while getting users');
  }
 
};

// Get profile by mail
const getUserByEmail = async (pEmail) => {
  try {
    const user = await User.findOne({
      where: {
        email: pEmail
      }
    })
    return user;
  } catch (error) {
    throw new Error('error while getting users');
  }

}

//Get users profile
const getUserProfile = async (pUserId) =>{
  try {
    const User = await User.findByPk(pUserId, {
      include: [ 'ShippingAddress',],
    });
    return User
  } catch (error) {
    throw new Error('Failed to retrieve user profile' );
  }
}
//edit button profile
async function changeUserInfo(
  pUserId,
  { firstName, lastName, email }
) {
  await User.update(
    { firstName, lastName, email },
    {
      where: {
        id: pUserId,
      },
    }
  );
}

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`User with id ${id} does not exist`);
    }
    await User.destroy();
    return User;
  } catch (error) {
    throw error;
  }
};
//contact us page
const contactUsSendEmail = async (pUserData) => {
  try {
    const emailOptions = {
      from: pUserData.email,
      to: "masumeh.amiri@hicoders.ch",
      subject: "new content from submition",
      html: `
            <p>Name: ${pUserData.name}</p>
            <p>Email: ${pUserData.email}</p>
            <p>Phone: ${pUserData.phone}</p>
            <p>Message: ${pUserData.message}</p>
          `,
    };
    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("hello");
        console.error(err);
      } else console.log(info);
    });
    // send automatic response to user
    const autoResponseOptions = {
      from: "masumeh.amiri@hicoders.ch",
      to: pUserData.email,
      subject: "Thank you for your email",
      html: "<p>Thank you for contacting us. We will respond as soon as possible.</p>",
    };

    await transporter.sendMail(autoResponseOptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
};
export default {
  getAllUser,
  getUserByEmail,
  createUser,
  changeUserInfo,
  deleteUser,
  contactUsSendEmail,
  getUserProfile
};
