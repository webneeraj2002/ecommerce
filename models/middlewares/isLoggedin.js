const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "You need to login first")
        return res.redirect("/");
    }
  
    try{
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        const user = await userModel.findOne({email: decoded.email})
        .select("-password")
        req.user = user;
        next();  
    }catch(error){
        req.flash("error", "Invalid token")
        res.redirect("/")
    }
};