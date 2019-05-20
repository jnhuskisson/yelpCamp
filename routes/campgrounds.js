var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    methodOverride = require("method-override"),
    middleware = require("../middleware");
// no need for /index.js because magic 

// INDEX route- show campgrounds
router.get("/campgrounds", function (req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user, page: "campgrounds" });
            // if there is not logged in user then currentUser is undefined
        }
    });
});
// Create Route- add new campground to db
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, price: price, image: image, description: description, author: author };

    // create new campground and save to DB
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
// NEW- show form to create new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});
// Show route- shows more info about one campground
router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not Found!");
            res.redirect("back");
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// Edit Route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// Update Route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Destroy Route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

// middleware



module.exports = router;