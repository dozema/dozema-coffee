const Spot = require("../models/Spot.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  Spot.find()
    .then((spotsFromDB) => {
      res.render("index", { spots: spotsFromDB, user: req.session.user });
    })
    .catch((err) => {
      console.log("Error getting spots from DB...", err);
    });
});

module.exports = router;
