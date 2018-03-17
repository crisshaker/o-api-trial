const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

const PARAMS = {
  post: "Post",
  user: "User"
};

const params = async (req, res, next) => {
  const reqParams = req.body.data.params;

  if (!reqParams) {
    return next();
  }

  for (key in reqParams) {
    const model = PARAMS[key];

    if (!model) {
      return res.send(`no such parameter: ${key}`);
    }

    const found = await mongoose.model(model).findById(reqParams[key]);
    if (!found) {
      return res.send(`resource not found for parameter:${key}`);
    }

    req.params[key] = found;
  }
  return next();
};

const handlers = {
  createUser: async (req, res) => {
    const user = new User(req.body.data);
    await user.save();

    return res.json(user);
  },
  createPost: async (req, res) => {
    const post = new Post(req.body.data);
    await post.save();

    return res.json(post);
  },
  likePost: async (req, res) => {
    return res.json(req.post);
  },
  test: async (req, res) => {
    return res.json(req.params);
  }
};

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
