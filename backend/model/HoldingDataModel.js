const {model} = require("mongoose");

const {HoldingDataSchema} = require("../Schema/HoldingDataSchema");
const HoldingDataModel = model("holdingData",HoldingDataSchema);

module.exports = {HoldingDataModel};