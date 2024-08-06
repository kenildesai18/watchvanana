// data he
import {brand } from "./constant/brands.js"

//this is a schema
import Brand from "./model/brand-schema.js";

const DefaultBrands = async () => {
  try {
    // not a copy data
    
    // data insert in achema
    await Brand.deleteMany({});
    await Brand.insertMany(brand);
    
    console.log("Logo Data import successfully");
  } catch (error) {
    console.log("error ............ ", error.message);
  }
};

export default DefaultBrands;
