const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const expressSession = require("express-session");
const flash = require("connect-flash");

const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/index");

require("dotenv").config(); // Load environment variables

// Middleware for parsing request bodies and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set static file directory and view engine
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Set up express-session middleware
app.use(
    expressSession({
        resave: false,
        saveUninitialized: true,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

// Use flash messages middleware (should be after session)
app.use(flash());

// Flash message middleware for global access
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Connecting to the database
const db = require("./config/mongooseConnection");

// Use routers
app.use('/owners', ownerRouter);
app.use('/products',productRouter);
app.use('/users', userRouter);
app.use("/", indexRouter);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
