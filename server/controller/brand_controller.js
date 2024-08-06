import Brand from "../model/brand-schema.js";

export const getBrands = async (request, response) => {
  try {
    const brands = await Brand.find({});
    response.status(200).json(brands);
  } catch (error) {
    response.status(200).json({ message: "Network Error" });
  }
};


