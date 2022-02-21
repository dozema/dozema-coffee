const Spot = require("../models/Spot.model");

module.exports = (req, res, next) => {
  Spot.findById(req.params.spotId)
    .populate("creator")
    .then((spotFromDB) => {
      if (spotFromDB.creator._id.toString() !== req.session.user._id.toString()) {
        res.render("error");
        return;
      }
      req.user = req.session.user;
      next();
    });
};
