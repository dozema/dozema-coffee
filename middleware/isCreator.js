const Spot = require("../models/Spot.model");
const User = require("../models/User.model");

module.exports = (req, res, next) => {
  Spot.findById(req.params.spotId)
    .populate("creator")
    .then((spotFromDB) => {
      console.log("this is the req.params._id", req.params.spotId);
      console.log("this is the spot from DB", spotFromDB);
      console.log("this is the creator ", spotFromDB.creator._id);
      console.log("this is the id of the current user", req.session.user._id);
      if (spotFromDB.creator.email !== req.session.user.email) {
        res.render("error");
        return;
      }
      req.user = req.session.user;
      next();
    });
};
