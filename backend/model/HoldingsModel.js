const {model} = require("mongoose");

const {HoldingsSchema} = require("../Schema/HoldingsSchema");
const HoldingsModel = model("holding",HoldingsSchema);

module.exports = {HoldingsModel};