var express = require("express");
var router = express.Router();
var SseChannel = require("sse-channel");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("channels", { title: "channels" });
});

var pushChannel = new SseChannel();

router.get("/push", function(req, res) {
  const id = req.query.id;
  res["user_id"] = id;
  pushChannel.addClient(req, res);

  setInterval(() => {
    pushChannel.send({ data: "Some message here" });
    pushChannel.send({
      event: "event",
      data: "Manchester Utd - Swansea (2-1: Wayne Rooney)"
    });
  }, 3000);
});

module.exports = router;
