module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (req.body.creator !== req.session.user._id) {
    res.render("error");
    return;
  }
  req.user = req.session.user;
  next();
};
