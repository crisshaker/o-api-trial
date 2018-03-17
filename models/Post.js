const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  _author: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = PostSchema;
