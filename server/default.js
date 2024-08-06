// data he
import { product } from "./constant/data.js";

//this is a schema
import Product from "./model/product-schema.js";

const DefaultData = async () => {
  try {
    // not a copy data
    
    await Product.deleteMany({});
    // data insert in achema
    await Product.insertMany(product);
    console.log("Product Data import successfully");
  } catch (error) {
    console.log("error ............ ", error.message);
  }
};

export default DefaultData;
