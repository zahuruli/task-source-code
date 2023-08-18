import slugify from "slugify";
import userModel from "../models/userModel.js";

//CREATE USER
export const createUserController = async (req, res) => {
  try {
    const { name, sectors, agreement } = req.body;

    //validation:
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!sectors) {
      return res.send({ message: "Sectors is Required" });
    }
    if (!agreement) {
      return res.send({ message: "Agreement is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ slug: slugify(name) });
    //existing user:
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Aready exist username please try another",
      });
    }
    //create user
    const user = await new userModel({
      name,
      slug: slugify(name),
      sectors,
      agreement,
    }).save();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating user",
      error,
    });
  }
};

///UPDATE USER
export const updateUserController = async (req, res) => {
  try {
    const { name, sectors, agreement } = req.body;
    const user = await userModel.findById(req.params.id);

    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: name || user.name,
        sectors: sectors || user.sectors,
        agreement: agreement || user.agreement,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating user",
      error,
    });
  }
};

//get single user:
export const getSingleUserController = async (req, res) => {
  try {
    const { slug } = req.params;

    const user = await userModel.findOne({ slug });
    res.status(201).send({
      success: true,
      message: "Single user found successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single user",
      error,
    });
  }
};

//get all user:
export const getallUserController = async (req, res) => {
  try {
    const users = await userModel.find({}).sort({ createAt: "-1" });
    res.status(201).send({
      success: true,
      message: "All users found successfully",
      total: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all users",
      error,
    });
  }
};
