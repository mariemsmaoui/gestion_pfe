const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')
//define structure of document stored in collection

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
    minlength: 6,
    max: 255,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  
    minlength: 10,
    max: 255,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
    
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});


//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {//not rehashed 
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//passwords match compare
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//manage json web token
  userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

  //generate reset hashed token
  userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000); // 15 Minutes
  
    return resetToken;
  };
   
const model = mongoose.model("User", userSchema);
module.exports = model;
