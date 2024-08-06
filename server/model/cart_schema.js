import mongoose from "mongoose";

const cartShcema = mongoose.Schema({
  username: String,
  id: String,
  url: String,
  shortTitle: String,
  longTitle: String,
  size: String,
  mrp: Number,
  quantity: Number,
});

const cart = mongoose.model("cartShcema", cartShcema);

export default cart;
