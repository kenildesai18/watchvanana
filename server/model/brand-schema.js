import mongoose from "mongoose";

const BrandSchema = mongoose.Schema({
  url:{
    type: String,
    required: true,
    unique: true,
  },
  
});

const Brand = mongoose.model("BrandsImg", BrandSchema);

export default Brand;
