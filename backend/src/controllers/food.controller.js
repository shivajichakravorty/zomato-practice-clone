const foodModel = require("../models/food.models");
const storageService = require("../services/storage.service");

const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    const { name, description } = req.body;
    const foodPartner = req.foodPartner;
    const video = req.file ? req.file.originalname : null;

    if (!name) {
      return res.status(400).json({ message: "Food name is required" });
    }

    if (!video) {
      return res.status(400).json({ message: "Video file is required" });
    }

    // ImageKit Integration for Image Upload
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );
    // console.log("File uploaded to ImageKit:", fileUploadResult);

    // Uploading to Mongo DB
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartner: foodPartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel.find();
    res.status(200).json({ foodItems });
  } catch (error) {
    console.error("Error fetching food items:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createFood,
  getFoodItems,
};
