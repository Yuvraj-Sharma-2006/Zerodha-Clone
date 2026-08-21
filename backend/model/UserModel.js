const {model} = require("mongoose");

const {userSchema} = require("../Schema/UserSchema");

const UserModel = model("user",userSchema);

module.exports = {UserModel};