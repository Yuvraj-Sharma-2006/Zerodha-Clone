const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    minlength : [3, "Your username must be at least 3 characters long"],
    maxlength : [20, "Your username must be at most 20 characters long"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
    minlength: [8, "Your password must be at least 8 characters long"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  opening_balance : {
     type : Number,
     min : 0,
     default : 0,
  },
  available_balance : {
     type : Number,
     min : 0,
     default : 0, 
  }
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = {userSchema}
