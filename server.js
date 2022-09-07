require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const errorHandler=require('./middleware/error')
const cors =require('cors')
connectDB();
app.use(cors())

app.use(express.json());


// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
//error handler :last

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});