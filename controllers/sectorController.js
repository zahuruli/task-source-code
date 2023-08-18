import slugify from "slugify";
import sectorModel from "../models/sectorModel.js";

export const createSectorController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Sector name is required" });
    }

    const existingSector = await sectorModel.findOne({ name });

    if (existingSector) {
      return res.status(200).send({
        success: false,
        message: "Sector Already Exist",
      });
    }

    const sector = await new sectorModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Sector Created Successfully",
      sector,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while  Creating Sector",
    });
  }
};

//get all Category Controller:

export const getallSectorController = async (req, res) => {
  try {
    const sectors = await sectorModel.find({});
    res.status(201).send({
      success: true,
      message: " Found all sector successfully",
      total: sectors.length,
      sectors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Category",
    });
  }
};
