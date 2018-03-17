const handlers = require("./handlers");
const params = require("./params");

module.exports = app => {
  app.post("/api", params, (req, res) => {
    const handler = handlers[req.body.action];

    if (handler) {
      return handler(req, res);
    }

    return res.json({
      error: {
        message: "no such handler"
      }
    });
  });
};
