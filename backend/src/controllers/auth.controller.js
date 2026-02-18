const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "User logged in successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully" });
}

async function registerFoodPartner(req, res) {
  try {
    // Similar to registerUser but for food partners
    const { name, email, password } = req.body;

    // Check if food partner already exists
    const existingPartner = await foodPartnerModel.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Food partner already exists" });
    }

    // Create new food partner
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPartner = new foodPartnerModel({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    await newPartner.save();

    res.status(201).json({
      message: "Food partner registered successfully",
      partner: {
        id: newPartner._id,
        name: newPartner.name,
        email: newPartner.email,
      },
    });
  } catch (error) {
    console.error(
      "Error registering food partner:",
      error.message,
      error.stack,
    );
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function loginFoodPartner(req, res) {
  try {
    // Similar to loginUser but for food partners
    const { email, password } = req.body;

    // Check if food partner exists
    const partner = await foodPartnerModel.findOne({ email });
    if (!partner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: partner._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "Food partner logged in successfully",
      partner: { id: partner._id, name: partner.name, email: partner.email },
    });
  } catch (error) {
    console.error("Error logging in food partner:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.json({ message: "Food partner logged out successfully" });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
