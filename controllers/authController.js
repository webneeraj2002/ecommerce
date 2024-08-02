// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user-model");
// const { generateToken } = require("../utils/generateToken")
// module.exports.registerUser = async(req, res) => {
//     try {
//       const { email, password, fullname } = req.body;
//       const user = await userModel.findOne({email: email})
//       if (user) {
//         return res.status(400).json({ message: "Email already exists" });
//         }


//       bcrypt.genSalt(10, async (err, salt) => {
//         bcrypt.hash(password, salt, async function (err, hash) {
//           if (err) return res.send(err.message);
//           else {
//             await userModel.create({
//               email: email,
//               password: hash,
//               fullname: fullname,
//             })
           
//             let token = generateToken(user);
//           res.cookie("token", token);
//           res.redirect("/shop");       
//         }  
//         });
//       });
//     } catch (error) { 
//       res.status(400).send(error.message);
//     }
//   }
//   module.exports.loginUser = async(req, res)=>{
//     let{email, password} = req.body;
//     let user = await userModel.findOne({email: email});
//     if(!user) return res.send("Email or password is incorrect");
//     bcrypt.compare(password, user.password, function(err, result){
//         if(result){
//             let token = generateToken(user);
//             res.cookie("token", token);
//             res.json({message: "User logged in successfully", token});
//         }
//         else{
//             res.send("Email or password is incorrect");
//         }
//     })
//   }

//   module.exports.logout = async(req, res)=>{
//     res.cookie("token", ""),
//     res.redirect("/");
//   }


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const {fullname, email, password,  } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    if (user) {
      const token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    res.status(400).send(error.message);
    console.log(error);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } else {
    res.status(400).json({ message: "Email or password is incorrect" });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
