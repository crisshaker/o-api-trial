const mongoose = require("mongoose");
const handlers = require("./handlers");

const PARAMS = {
  post: "Post",
  user: "User"
};

module.exports = app => {
  app.post("/api", (req, res) => {
    const { action, data: { params } } = req.body;
    const handler = handlers[action];

    if (!handler) {
      return res.send(`unknown action: ${action}`);
    }

    if (!handler.params) {
      return handler.handle(req, res);
    }

    const promises = handler.params.map(
      param =>
        new Promise(async (resolve, reject) => {
          if (!params[param]) {
            return res.send(`missing required parameter: ${param}`);
          }

          const modelClass = PARAMS[param];
          const instance = await mongoose
            .model(modelClass)
            .findById(params[param]);
          if (!instance) {
            reject(`resource not found for parameter: ${param}`);
          }

          resolve({ param, instance });
        })
    );

    Promise.all(promises)
      .then(results => {
        results.forEach(
          paramData => (req.params[paramData.param] = paramData.instance)
        );
        return handler.handle(req, res);
      })
      .catch(reason => res.send(reason));
  });
};
