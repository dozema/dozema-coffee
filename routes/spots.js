const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Spot = require("../models/Spot.model");
const User = require("../models/User.model");
const isCreator = require("../middleware/isCreator");
const req = require("express/lib/request");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  Spot.find()
    .populate("creator")
    .then((spotsFromDB) => {
      res.render("spots/spots-list", { spots: spotsFromDB });
    })
    .catch((err) => {
      console.log("Error getting spots from DB...", err);
    });
});

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("spots/spot-create");
});

router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("spotPicture"),
  (req, res, next) => {
    const newSpot = {
      title: req.body.title,
      details: req.body.details,
      description: req.body.description,
      creator: req.session.user,
      rating: req.body.rating,
      address: req.body.address,
      location: {
        type: "Point",
        coordinates: [req.body.longitude, req.body.latitude],
      },
      averagePrice: req.body.averagePrice,
      openingHours: req.body.openingHours,
      imageUrl: req.file.path,
    };
    Spot.create(newSpot)
      .then(() => {
        res.redirect("/spots");
      })
      .catch((err) => {
        console.log("Error creating spot...", err);
      });
  }
);

router.get("/:spotId/spot-details", (req, res, next) => {
  Spot.findById(req.params.spotId)
    .populate("creator")

    .then((spotDetails) => {
      res.render("spots/spot-details", spotDetails);
    })
    .catch((err) => {
      console.log("Error getting spotdetails from DB...", err);
    });
});

router.get("/:spotId/edit", isLoggedIn, isCreator, (req, res, next) => {
  Spot.findById(req.params.spotId)
    .populate("creator")
    .then((spotToEdit) => {
      res.render("spots/spot-edit", spotToEdit);
    })
    .catch((err) => {
      console.log("Error getting spotdetails from DB...", err);
    });
});

router.post("/:spotId/edit", isLoggedIn, isCreator, (req, res, next) => {
  const { spotId } = req.params;
  const spot = {
    title: req.body.title,
    details: req.body.details,
    description: req.body.description,
    creator: req.session.user,
    rating: req.body.rating,
    address: req.body.address,
    averagePrice: req.body.averagePrice,
    openingHours: req.body.openingHours,
  };
  Spot.findByIdAndUpdate(spotId, spot)
    .then(() => res.redirect(`/spots/${spotId}/spot-details`))
    .catch((err) => {
      console.log("Error editing spotdetails from DB...", err);
    });
});

router.post("/:spotId/delete", isLoggedIn, isCreator, (req, res, next) => {
  Spot.findByIdAndDelete(req.params.spotId)
    .then(() => {
      res.redirect("/spots");
    })
    .catch((err) => {
      console.log("Error deleting spotdetails from DB...", err);
    });
});

//===== Create get.route for user favorite spots
router.get("/:spotId/favorite", isLoggedIn, (req, res, next) => {
  const spotId = req.params.spotId;

  User.findByIdAndUpdate(req.session.user._id, {
    $push: { favoriteSpots: spotId },
  })
    .then(() => {
      res.redirect(`/spots/${spotId}/spot-details`);
    })
    .catch((err) => {
      console.log("Error updating favorite spots...", err);
    });
});

module.exports = router;
