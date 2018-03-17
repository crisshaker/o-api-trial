const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

module.exports = {
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
