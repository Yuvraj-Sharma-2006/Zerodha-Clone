const {Schema} = require("mongoose");

const HoldingsSchema = new Schema({
    name:String,
    qty:Number,
    avg:Number,
    price:Number,
    net:String,
    day:String,
    date: { 
       type: Date, 
       default: Date.now, 
    },
    userId : {
        type : Schema.Types.ObjectId,
        required :true,
    }
});

module.exports = {HoldingsSchema};