const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,

  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;