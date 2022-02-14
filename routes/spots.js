const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Spot = require("../models/Spot.model");

router.get("/", (req, res, next) => {
  Spot.find()
    .then((spotsFromDB) => {
      res.render("spots/spots-list", { spots: spotsFromDB });
    })
    .catch((err) => {
      console.log("Error getting spots from DB...", err);
    });
});

router.get("/create", (req, res, next) => {
  res.render("spots/spot-create");
});

router.post("/create", (req, res, next) => {
  const newSpot = {
    title: req.body.title,
    details: req.body.details,
    description: req.body.description,
    creator: req.body.user,
    rating: req.body.rating,
    address: req.body.address,
    averagePrice: req.body.averagePrice,
    openingHours: req.body.openingHours,
  };
  Spot.create(newSpot)
    .then(() => {
      res.redirect("/spots/spots-list");
    })
    .catch((err) => {
      console.log("Error creating spot...", err);
    });
});

router.get("/:spotId/spot-details", (req, res, next) => {
  Spot.findById(req.params.spotId)
    .then((spotDetails) => {
      res.render("spots/spot-details", spotDetails);
    })
    .catch((err) => {
      console.log("Error getting spotdetails from DB...", err);
    });
});

router.get("/:spotId/edit", (req, res, next) => {
  Spot.findById(req.params.spotId)
    .populate("creator")
    .then((spotToEdit) => {
      res.render("spots/spot-edit", spotToEdit);
    })
    .catch((err) => {
      console.log("Error getting spotdetails from DB...", err);
    });
});

router.post("/:spotId/edit", (req, res, next) => {
  const { spotId } = req.params;
  const spot = {
    title: req.body.title,
    details: req.body.details,
    description: req.body.description,
    creator: req.body.user,
    rating: req.body.rating,
    address: req.body.address,
    averagePrice: req.body.averagePrice,
    openingHours: req.body.openingHours,
  };
  Spot.findByIdAndUpdate(spotId, spot)
    .then(() => res.redirect(`/spot/${spotId}`))
    .catch((err) => {
      console.log("Error editing spotdetails from DB...", err);
    });
});

router.post("/:spotId/delete", (req, res, next) => {
  Spot.findByIdAndDelete(req.params.spotId)
    .then(() => {
      res.redirect("/spots");
    })
    .catch((err) => {
      console.log("Error deleting spotdetails from DB...", err);
    });
});

module.exports = router;
