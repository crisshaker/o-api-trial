const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String
});

mongoose.model("User", UserSchema);

const PostSchema = new Schema({
  title: String,
  body: String,
  _author: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("Post", PostSchema);
