var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("admin", { title: "admin" });
});

router.get("/pushNotification", function(req, res, next) {
  console.log(req);
});

module.exports = router;
