var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


// root route
router.get("/", function (req, res) {
    res.render("landing");
});



// ============
// Auth Routes
// =========

// Register Form
router.get("/register", function (req, res) {
    res.render("register", { page: "register" });
});

// Handle Logic Sign up
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to GoCamp WA, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Show Login form
router.get("/login", function (req, res) {
    res.render("login", { page: "login" });
});
// login Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function (req, res) {

    });
// log out route
router.get("/logout", function (req, res) {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});



module.exports = router