const {model} = require("mongoose");

const {OrdersSchema} = require("../Schema/OrdersSchema");
const OrdersModel = model("order",OrdersSchema);

module.exports = {OrdersModel};