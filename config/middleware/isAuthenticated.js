// middleware implemented to prevent users from accessing routes they are not permitted to access
module.exports = function (req, res, next) {
// Allows user to proceed to restricted route if logged in
if (req.user) {
    return next();
  }

  // Redirect user from accessing restricted page if not logged in.
  return res.redirect("/");
};