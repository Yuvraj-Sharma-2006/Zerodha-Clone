const {Schema} = require("mongoose");

const HoldingDataSchema = new Schema({
    name:String,
    avg:Number,
    price:Number,
    net:String,
    day:String,
});

module.exports = {HoldingDataSchema};