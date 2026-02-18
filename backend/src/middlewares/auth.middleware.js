const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.userId);
    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function authUserMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message, error.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
