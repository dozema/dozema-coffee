const router = require("express").Router();
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const Spot = require("../models/Spot.model");
const User = require("../models/User.model");
const isCreator = require("../middleware/isCreator");
const fileUploader = require("../config/cloudinary.config");
const axios = require("axios");

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

router.get("/locations", (req, res, next) => {
  Spot.find()
    .populate("creator")
    .then((spotsFromDB) => {
      const spotsLocations = spotsFromDB.map((spot) => ({
        ...spot.location,
        id: spot._id,
      }));
      res.json({ locations: spotsLocations });
    })
    .catch((err) => {
      console.log("Error getting spots from DB...", err);
    });
});

router.get("/create", isLoggedIn, (req, res, next) => {
  // Getting all enumValues from Spotmodel
  let details = Spot.schema.path("details").caster.enumValues;
  res.render("spots/spot-create", { details: details });
});

router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("spotPicture"),
  (req, res, next) => {
    let address = req.body.address;
    const newSpot = {
      title: req.body.title,
      description: req.body.description,
      creator: req.session.user,
      averagePrice: req.body.averagePrice,
      openingHours: req.body.openingHours,
      imageUrl: req.file?.path,
      details: req.body.details,
      address,
    };
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(
          address
        )}&key=AIzaSyBESkPQYieOnIYDgeryIpZALxce_BORe04`
      )
      .then((result) => {
        if (result.data) {
          return (newSpot.location = {
            latitude: result.data.results[0].geometry.location.lat,
            longitude: result.data.results[0].geometry.location.lng,
          });
        }
      })
      .then(() => {
        Spot.create(newSpot)
          .then(() => {
            res.redirect("/spots");
          })
          .catch((err) => {
            console.log("Error creating spot...", err);
          });
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
  let details = Spot.schema.path("details").caster.enumValues;
  Spot.findById(req.params.spotId)
    .populate("creator")
    .then((spot) => {
      // Filter out already selected details
      let newDetails = details.filter(
        (detail) => !spot.details.includes(detail)
      );
      res.render("spots/spot-edit", { spot, details: newDetails });
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
    averagePrice: req.body.averagePrice,
    openingHours: req.body.openingHours,
    details: req.body.details,
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

router.get("/:spotId/favorite", isLoggedIn, (req, res, next) => {
  const spotId = req.params.spotId;

  User.findByIdAndUpdate(req.session.user._id, {
    $addToSet: { favoriteSpots: spotId, new: true, upsert: true },
  })
    .exec()
    .then(() => {
      res.redirect(`/spots/${spotId}/spot-details`);
    })
    .catch((err) => {
      console.log("Error updating favorite spots...", err);
    });
});

module.exports = router;
