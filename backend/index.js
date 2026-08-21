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
        origin: ["http://localhost:5173", "http://localhost:5174"],
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

app.get("/addHoldings",async(req,res)=>{
    const holdings = [
          {
            name: "QUICKHEAL",
            avg : 308.55,
            net : "-5%",
            price : 293.1225, 
            day : "-0.15%",
            isLoss: true,
          },
       {
        name: "ONGC",
        avg : 116.8,
        net: "-5.82%",
        price : 110,
        day : "-0.90%",
        isLoss :  true,
      },
      {
        name: "BHARTIARTL",
        avg: 538.05,
        price: 541.15,
        net: "+0.58%",
        day: "+2.99%",
        isLoss : false,
      },
      {
        name: "HDFCBANK",
        avg: 1383.4,
        price: 1522.35,
        net: "+10.04%",
        day: "+0.11%",
        isLoss : false,
      },
      {
        name: "HINDUNILVR",
        avg: 2335.85,
        price: 2417.4,
        net: "+3.49%",
        day: "+0.21%",
        isLoss : false,
      },
      {
        name: "INFY",
        avg: 1350.5,
        price: 1555.45,
        net: "+15.18%",
        day: "-1.60%",
        isLoss: false,
      },
      {
        name: "ITC",
        avg: 202.0,
        price: 207.9,
        net: "+2.92%",
        day: "+0.80%",
        isLoss : false,
      },
      {
        name: "KPITTECH",
        avg: 250.3,
        price: 266.45,
        net: "+6.45%",
        day: "+3.54%",
        isLoss : false,
      },
      {
        name: "M&M",
        avg: 809.9,
        price: 779.8,
        net: "-3.72%",
        day: "-0.01%",
        isLoss: true,
      },
      {
        name: "RELIANCE",
        avg: 2193.7,
        price: 2112.4,
        net: "-3.71%",
        day: "+1.44%",
        isLoss : true,
      },
      {
        name: "SBIN",
        avg: 324.35,
        price: 430.2,
        net: "+32.63%",
        day: "-0.34%",
        isLoss: true,
      },
      {
        name: "SGBMAY29",
        avg: 4727.0,
        price: 4719.0,
        net: "-0.17%",
        day: "+0.15%",
        isLoss : true,
      },
      {
        name: "TATAPOWER",
        avg: 104.2,
        price: 124.15,
        net: "+19.15%",
        day: "-0.24%",
        isLoss: true,
      },
      {
        name: "TCS",
        avg: 3041.7,
        price: 3194.8,
        net: "+5.03%",
        day: "-0.25%",
        isLoss: true,
      },
      {
        name: "WIPRO",
        avg: 489.3,
        price: 577.75,
        net: "+18.08%",
        day: "+0.32%",
        isLoss : true,
      },
    ];
    HoldingDataModel.insertMany(holdings).then(()=>{
    console.log("holdings added");
  }).catch((err)=>{
    console.log(err);
 });
 res.send("holdings added");
});

// app.get("/addPositions",async(req,res)=>{
//    const positions = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
//   PositionsModel.insertMany(positions).then(()=>{
//     console.log("positions added");
//   }).catch((err)=>{
//     console.log(err);
//  });
//  res.send("positions added");
// });

app.listen(port, () => {
    console.log("server is started");
})