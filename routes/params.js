const mongoose = require("mongoose");

const PARAMS = {
  post: "Post",
  user: "User"
};

module.exports = async (req, res, next) => {
  const reqParams = req.body.data.params;

  if (!reqParams) {
    return next();
  }

  for (key in reqParams) {
    const modelClass = PARAMS[key];

    if (!modelClass) {
      return res.send(`no such parameter: ${key}`);
    }

    const instance = await mongoose.model(modelClass).findById(reqParams[key]);
    if (!instance) {
      return res.send(`resource not found for parameter:${key}`);
    }

    req.params[key] = instance;
  }
  return next();
};
