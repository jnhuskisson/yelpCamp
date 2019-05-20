var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

app.use(flash());

// Passport Configuration
app.use(require("express-session")({
    secret: "I have no idea what I'm doing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect("mongodb+srv://jhuskisson:_.$YMd},(jDFi2L@cluster0-vgz8z.mongodb.net/test?retryWrites=true", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(methodOverride("_method"));
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);



// seedDB(); Seed the database



app.listen(process.env.PORT, process.env.IP, function (req, res) {
    console.log("Yelp Camp Server Has Started!")
});