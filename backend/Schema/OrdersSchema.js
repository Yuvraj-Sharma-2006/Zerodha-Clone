const {Schema} = require("mongoose");

const OrdersSchema = new Schema({
    name:{
    type: String,
    required: [true, "Your ordered stock name is required"],
  },
    qty:{
    type: Number,
    required: [true, "Your order quantity is required"],
    min : 1,
   },
    price:{
    type: Number,
    required: [true, "Your order price is required"],
    min : 1,
   },
    mode:{
    type: String,
    required: [true, "Your order mode is required"],
    enum : ["BUY","SELL"],
   },
   date: { 
    type: Date, 
    default: Date.now, 
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "Users",
        required :true,
    }
});

module.exports = {OrdersSchema};