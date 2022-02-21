const Spot = require("../models/Spot.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  Spot.find()
    .then((spotsFromDB) => {
      // Sending only the first three spots from MongoDB
      res.render("index", { spots: spotsFromDB.slice(0,3) });
    })
    .catch((err) => {
      console.log("Error getting spots from DB...", err);
    });
});

module.exports = router;
