var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.redirect(302, "/index.htm");
  res.end();
});


/* GET home page. */
router.get("/index.htm", function(req, res, next) {
  res.render("index");
});

/* GET home page. */
router.get("/tracks.htm", function(req, res, next) {
  res.render("tracks");
});

module.exports = router;
