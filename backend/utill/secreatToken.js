require("dotenv").config();

const jwt = require("jsonwebtoken");

const SecreatToken = (id) => {
    return jwt.sign({id} , process.env.token_key, { expiresIn : 7 * 24 * 60 * 60 });
}

module.exports = {SecreatToken};