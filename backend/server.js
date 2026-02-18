// Start Server

require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

// Connect to MongoDB
connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000: http://localhost:3000");
  });
});
