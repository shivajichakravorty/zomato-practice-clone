const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// Food API, must be protected, middleware will check the token and confirm the food partner is logged in
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

// API for users to show food items

module.exports = router;
