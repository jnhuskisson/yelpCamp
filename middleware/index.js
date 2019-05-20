// all middleware
var middlewareObj = {},
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not Found!");
                res.redirect("back");
            } else {
                // does user own campground
                // the first part is a mongoose object, inside () is a string
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must login first!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {

        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not Found!");
                res.redirect("back");
            } else {
                // does user own comment
                // the first part is a mongoose object so no ===, inside () is a string
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You must login first!");
    res.redirect("/login");
}


module.exports = middlewareObj