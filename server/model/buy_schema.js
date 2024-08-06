import mongoose from "mongoose";

const buySchema = mongoose.Schema({
  username: String,
  id: String,
  url: String,
  longTitle: String,
  mrp: Number,
  quantity: Number,
  addressLine1: String,
  addressLine2: String,
  pincode: String,
  village: String,
  state: String,
  district: String,
  TotalPrice: Number,
  date: Date,
});


const buyOrderdata = mongoose.model("newbuySchema", buySchema);

export default buyOrderdata;
