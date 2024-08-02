const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/create", upload.single("image"), async (req, res) => {
    try{
  let { name, price, discount, bgcolor, pancolor, textcolor } = req.body;
  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    pancolor,
    textcolor,
  })
  req.flash("sucess", "Product create successfully")
  res.redirect("/owners/admin")
}catch (error){
   res.send(error.message)
}
});

module.exports = router;