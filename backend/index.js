require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const url = process.env.MONGO_URL;
const port = process.env.PORT || 3002;

app.use(cors(
    {
        origin: [Frontend_URL, Dashboard_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const { HoldingDataModel } = require("./model/HoldingDataModel");
const { HoldingsModel } = require("./model/HoldingsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const { SecreatToken } = require("./utill/secreatToken");

async function main() {
    await mongoose.connect(url);
}

main().then(() => {
    console.log("Connected");
})
    .catch(err => {
        console.error(err);
    });

app.get("/allHoldings", async (req, res) => {
    const userId = req.session.currUser;
    const holdings = await HoldingsModel.find({userId});
    res.json(holdings);
});

app.get("/allPositions", async (req, res) => {
    const userId = req.session.currUser;
    const positions = await HoldingsModel.find({userId : userId,
                                $and : [ 
                                    { date :  { $gte : new Date(new Date().setHours(0,0,0,0)) }} ,
                                    { date :  { $lt : new Date(new Date().setHours(24,0,0,0)) }}
                            ]});
    res.json(positions);
});

app.get("/allOrders", async (req, res) => {
    const userId = req.session.currUser;
    const Orders = await OrdersModel.find({userId : userId});
    res.json(Orders);
});

app.get("/balance", async (req, res) => {
    const userId = req.session.currUser;
    const user = await UserModel.findById({_id : userId });
    res.json({ openning_Bal: user.opening_balance, availble_Bal: user.available_balance });
});

app.post("/user", async (req, res) => {
    const { mode, amount } = req.body;
    const userId = req.session.currUser;
    if (mode === "add") {
        await UserModel.findByIdAndUpdate({_id : userId }, {
            $inc : { 
                opening_balance : amount ,
                available_balance: amount 
            },
        });
       return res.json({success : true, message: "Balance added successfully" });
    } else if (mode === "withDraw") {
        const user = await UserModel.findById({_id : userId });
        if (user.available_balance >= amount) {
           await UserModel.findByIdAndUpdate({ _id : userId }, {
            $inc : { 
                opening_balance : -amount ,
                available_balance: -amount
            },
           });
          return res.json({ success : true ,message : "money withdraw successfully" });
        }else{
            return res.json({ success : false ,message : "Insufficient balance" });
        }
    }
});

app.post('/newOrder', async (req, res) => {
  try{
    const { name, quantity, price, mode, date } = req.body;
    const userId = req.session.currUser;
    const order = new OrdersModel({ name, qty : quantity, price, mode, date ,userId});
    const holding = await HoldingsModel.findOne({name,userId});
    if(mode==='BUY'){
        const user = await UserModel.findById({_id : userId});
        if(user.available_balance >= (price * quantity)){
            if(holding){
                await HoldingsModel.findByIdAndUpdate({_id : holding._id},
                    {date : new Date() ,
                     $inc : {qty : quantity}
                    });
            }else{
             let holding = await HoldingDataModel.findOne({name});
             const newHolding = await HoldingsModel.create({name : holding.name,qty : quantity,userId : userId,avg : holding.avg,price : holding.price,net : holding.net,day : holding.day,date});
            }
            
            await UserModel.findByIdAndUpdate({ _id : userId }, {
            $inc : { 
                available_balance: -(price * quantity)
            },
           });

            await order.save();
            return res.json({success : true , message : "Order placed successfully"});
        }else{
            return res.json({success : false ,message : "you doesn't have money to buy this shares"});
        }
    }else if(mode==='SELL'){
        if(holding && holding.qty >= quantity){
            if(holding.qty > quantity){
                 await HoldingsModel.findByIdAndUpdate({_id : holding._id},
                    {date : new Date() ,
                     $inc : {qty : -quantity}
                    });
            }else{
                await HoldingsModel.findByIdAndDelete({_id : holding._id});
            }

            await UserModel.findByIdAndUpdate({ _id : userId }, {
            $inc : { 
                available_balance: (price * quantity)
            },
           });

           await order.save();
           return res.json({success : true , message : "Order placed successfully"});
        }else{
            return res.json({success : false , message : "you doesn't have this quantity of this share to sell"})
        }
    }else{
         return res.json({success : false , message : "Your order is wrong"})
    }
    }catch(err){
         console.log(err);
    }
});

app.post('/signup', async (req, res, next) => {
    try {
        const { email, password, username, createdAt, opening_balance, available_balance } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const user = new UserModel({ email, password, username, createdAt, opening_balance, available_balance });
        await user.save();
        const token = SecreatToken(user._id);
        res.cookie("token", token, {
            //withCredentials : true,
            httpOnly: false,
        });
        res.status(201)
            .json({
                message: "User signed in Successfully",
                success: true,
            });
        next();
    } catch (err) {
        console.error(err);
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.json({ message: "Incorrest password or email" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.json({ message: "Incorrect password or email" });
        }

        const token = SecreatToken(existingUser._id);
        res.cookie("token", token, {
            // withCredentials : true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User logged in successfully", success: true });
    } catch (err) {
        console.error(err);
    }
});

app.post("/", (req, res) => {
    if (!req.cookies.token) {
        return res.json({ status: false });
    }
    const token = req.cookies.token;
    jwt.verify(token, process.env.token_key, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await UserModel.findById(data.id);
            if(user) {
                req.session.currUser = user._id;
                return res.json({ status: true, user: user.username ,balance : user.available_balance , openning : user.opening_balance});
            } else {
                return res.json({ status: false });
            }
        }
    });

});

app.listen(port, () => {
    console.log("server is started");
})