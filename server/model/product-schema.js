import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  url: String,
  detailUrl: String,
  shortTitle: String,
  longTitle: String,
  size:String,
  mrp: Number,
  cost: Number,
  quantity: Number,
  description: String,
  discount: String,
  tagline: String,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
