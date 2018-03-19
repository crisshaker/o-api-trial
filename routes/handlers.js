const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

module.exports = {
  createUser: {
    handle: async (req, res) => {
      const user = new User(req.body.data);
      await user.save();

      return res.json(user);
    }
  },
  createPost: {
    handle: async (req, res) => {
      const post = new Post(req.body.data);
      await post.save();

      return res.json(post);
    }
  },
  likePost: {
    params: ["post"],
    handle: async (req, res) => {
      return res.json(req.params.post);
    }
  },
  test: {
    params: ["user", "post"],
    handle: async (req, res) => {
      // console.log(req.params);
      return res.json(req.params);
    }
  }
};
