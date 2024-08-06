import { request, response } from "express";
import Product from "../model/product-schema.js";
import userSchema from "../model/user_schema.js";
import buyOrderdata from "../model/buy_schema.js";

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({});
    // const re = await Product.find().select("id");
    const re = await Product.find().select("id mrp cost").limit(5).skip(1);

    console.log(" d a t a => ", re);
    response.status(200).json({ message: "Good Network", products });
  } catch (error) {
    response.status(200).json({ message: "Network Loss!" });
  }
};

export const getProductsById = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await Product.findOne({ id: id });
    response.status(200).json(product);
  } catch (error) {
    response.status(200).json({ message: "Network Loss!" });
  }
};

export const getProductsById1 = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await Product.findOne({ id: id });
    if (product) {
      response.status(200).json(product);
    } else {
      response.status(200).json({ success: false });
    }
  } catch (error) {
    response.status(400).json({ message: "Network Loss!" });
  }
};

export const updateProductsById = async (request, response) => {
  try {
    const id = request.params.id;
    console.log("crfvtvv ", request.params);
    const product = await Product.findOne({ id: id }).updateOne({
      $inc: { quantity: -request.params.quanty },
    });
    console.log(" = = = ", product);
    response.status(200).json(product);
  } catch (error) {
    response.status(200).json({ message: "Network Loss!" });
  }
};

export const getUser = async (request, response) => {
  try {
    console.log("object", request.params.username);
    const u = request.params.username;
    const data = await userSchema.findOne({ username: u });
    response.status(200).json(data);
  } catch (error) {
    response.status(200).json({ message: "Network Loos!" });
  }
};

export const getOredr = async (request, response) => {
  try {
    const uname = request.params.username;
    const data = await buyOrderdata.find({ username: uname });
    response.status(200).send({ success: true, data });
  } catch (error) {
    response.status(200).send({ success: false, message: "tata" });
  }
};

export const AdminOredr = async (request, response) => {
  try {
    const data = await buyOrderdata.find({});
    response.status(200).send({ success: true, data });
  } catch (error) {
    response.status(200).send({ success: false, message: "tata" });
  }
};

export const AdminAdd = async (request, response) => {
  try {
    const p = request.body.data;
    console.log("p = ", p.image1);
    const data = await Product.create({
      id: p.pid,
      url: `http://localhost:8001/photo/${request.body.image1}`,
      detailUrl: `http://localhost:8001/photo/${request.body.image1}`,
      shortTitle: p.shortTitle,
      longTitle: p.longTitle,
      mrp: p.mrp,
      cost: p.cost,
      quantity: p.quantity,
      description: p.description,
      discount: p.discount,
      tagline: p.gender,
    });
    // const newdata = await data.save();
    console.log("data = ", data);
    response.status(200).send({ success: true, data });
  } catch (error) {
    response.status(200).send({ success: false, message: "unsuccess..." });
  }
};

export const AdminRemove = async (request, response) => {
  try {
    const fid = request.body.data.pid;
    console.log(" = fid", fid);
    const product = await Product.findOne({ id: fid });
    if (product == null) {
      response
        .status(200)
        .send({ success: false, message: "Not Found Product" });
    } else {
      console.log("object = ", product);
      const data = await Product.deleteOne({ id: request.body.data.pid });
      response.status(201).send({ success: true, message: "Remove Item" });
    }
  } catch (error) {
    response.status(201).send({ success: false, message: "Error" });
  }
};

export const AdminUpdate = async (request, response) => {
  try {
    const data = request.body;
    console.log("data = ", data);
    const datata = request.body;
    const product = await Product.findOne({ id: datata.pid }).updateOne(
      { id: datata.pid },
      {
        $set: {
          tagline: datata.gender,
          discount: datata.discount,
          shortTitle: datata.shortTitle,
          description: datata.description,
          quantity: datata.quantity,
          cost: datata.cost,
          longTitle: datata.longTitle,
          mrp: datata.mrp,
        },
      }
    );
    console.log(" = = = = ", product);
    response.status(200).send({ success: true, message: "Yse.........!" });
  } catch (error) {
    response.status(200).send({ success: false, message: "Error" });
  }
};
