const express = require("express");
const ejs = require("ejs")
const app = express();
const cookieparser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");


const db = require("./config/mongoose-connection");
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const indexRouter = require("./routes/index")
require("dotenv").config();



const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(expressSession({
  secret: 'your-secret-key', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");





app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)


app.listen(port, ()=>[
  console.log(`Server is running on port ${port}`)
]);