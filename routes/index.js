var express = require("express");
var router = express.Router();
const cors = require("cors");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

const connections = {};

const sendSimpleMessage = res => {
  res.write("data: Heartbeat\n\n");
};

const sendEvent = res => {
  const data = {
    name: "your name",
    email: "your email"
  };
  res.write(`event: event\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

const sendPushMessage = res => {
  const data = {
    payload: "Your push data"
  };
  res.write(`event: pushNotification\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};

router.get("/events", cors(), (req, res) => {
  const id = req.query.id;
  connections[id] = { res};
  console.log(req.query.id)

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive"
  });

  setInterval(() => {
    sendSimpleMessage(res);
    sendEvent(res);
  }, 3000);
});

router.post("/pushNotification", function(req, res, next) {
  Object.values(connections).forEach(connection => {
    sendPushMessage(connection.res);
  });

  res.end();
});

router.post("/pushNotificationToAUser", function(req, res, next) {
  const connection = Object.values(connections)[0];
  sendPushMessage(connection.res);

  res.end();
});

module.exports = router;
