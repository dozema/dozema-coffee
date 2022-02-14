const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

//====== Create route for user profile
router.get("/user-profile", isLoggedIn, (req, res) => {
  res.render("users/user-profile", { userInSession: req.session.user });
});

//====== Create get & post route for user edit
router.get("/:userId/edit", isLoggedIn, (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .then((userDetails) => {
      res.render("users/edit-profile", userDetails);
    })
    .catch((err) => {
      console.log("Error getting user details from DB...", err);
    });
});

router.post("/:userId/edit", isLoggedIn, (req, res) => {
  const userId = req.params.userId;

  const newDetails = {
    email: req.body.email,
    password: req.body.password,
  };

  User.findByIdAndUpdate(userId, newDetails)
    .then(() => {
      res.redirect("/users/user-profile");
    })
    .catch((err) => {
      console.log("Error updating user details", err);
    });
});

//====== Create route for user delete
router.post("/:userId/delete", isLoggedIn, (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error deleting user", err);
    });
});

module.exports = router;