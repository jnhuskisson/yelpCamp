// create campgrounds and comments. Error driven development
var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    data = [
        {
            name: "Cloud's Rest",
            image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
            description: "blah blah"

        },
        {
            name: "Lake Place",
            image: "http://visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg",
            description: "blah blah"

        },
        {
            name: "River Place",
            image: "https://www.rei.com/adventures/assets/adventures/images/trip/gallery/asia/fta_02",
            description: "blah blah"

        }
    ]

function seedDB() {
    // remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
        }
        // add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a Campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great but I miss my internet",
                            author: "Homer"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new Comment");
                            }
                        });
                }
            });
        });
    });

    // add a few comments
}

module.exports = seedDB;