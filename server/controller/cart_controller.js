import cartShcema from "../model/cart_schema.js";
import jwt from "jsonwebtoken";
const secret = "Darsh$2003";
let cnt = 0;
import buyOrderdata from "../model/buy_schema.js";
import { request, response } from "express";
// import { Schema } from "mongoose";

// get cartdetail
export const get_cart_detail = async (request, response) => {
  try {
    const data = request.params;
    // console.log("data = ", data);
    const data_all = await cartShcema.find({
      username: data.username,
      id: data.pid,
    });
    // console.log("data_all", data_all);
    response.status(200).send({ success: true, message: data_all });
  } catch (error) {
    response.status(200).send({ success: false, message: "sorry...!" });
  }
};

export const addTocart = async (request, response) => {
  try {
    const token = request.body.token;
    const data = request.body;

    // console.log("token = ", token);

    const id1 = data.data.id;

    // console.log("id1 =", id1);

    const user = jwt.verify(token, secret);

    if (request.body.data == null) {
      return response
        .status(200)
        .send({ success: false, message: "Data Not Found" });
    }

    const fn = await cartShcema.findOne({
      username: data.un,
      id: data.data.id,
    });
    console.log("fn = ", fn);

    if (fn == null) {
      const cart_obj = new cartShcema({
        username: user.username,
        id: request.body.data.id,
        url: request.body.data.url,
        shortTitle: request.body.data.shortTitle,
        longTitle: request.body.data.longTitle,
        size: request.body.data.size,
        mrp: request.body.data.mrp,
        quantity: request.body.data.quantity,
      });

      const cartData = await cart_obj.save();

      response
        .status(200)
        .send({ success: true, message: "cart product detail" });
    } else {
      const cart_obj1 = await cartShcema
        .findOne({ username: data.un, id: id1 })
        .updateOne({ $inc: { quantity: +1 } });

      response
        .status(200)
        .send({ success: true, message: "cart product detail" });
      // console.log("gf", cart_obj1);
    }
  } catch (error) {
    response.status(200).send({ success: false, message: "Login Require" });
  }
};

export const getProduct = async (request, response) => {
  try {
    const token = request.body.token;
    const user = jwt.verify(token, secret);
    //   console.log(d);
    const data = await cartShcema.find({ username: user.username });
    // console.log(data);
    return response.status(200).send({ success: true, data: data });
  } catch (error) {
    response.status(200).send({ success: false, data: [] });
  }
};

export const removeFromcart = async (request, response) => {
  try {
    const data = await cartShcema.deleteOne({ id: request.body.id });
    return response.status(200).send({ success: true, data: data });
  } catch (error) {
    response.status(200).send({ success: false, data: [] });
  }
};

export const buyOrder = async (request, response) => {
  const data = request.body.uname;
  const d2 = request.body.detailofadd;
  const d3 = request.body.data;

  // console.log("object = ", request.body);

  console.log("data =>", data);
  console.log("d2 =>", d2);
  console.log("d3 =>", d3);
  console.log(data);
  try {
    if (data == null) {
      return response
        .status(200)
        .send({ success: false, message: "Data Not Found" });
    }
    var date = new Date();
    var total = d3.mrp * d3.quantity;
    const obj = new buyOrderdata({
      username: data,
      id: d3.id,
      url: d3.url,
      longTitle: d3.longTitle,
      mrp: d3.mrp,
      quantity: d3.quantity,
      addressLine1: d2.line1,
      addressLine2: d2.line2,
      pincode: d2.pincode,
      village: d2.village,
      state: d2.state,
      district: d2.district,
      TotalPrice: total,
      date: date,
    });

    const cartData = await obj.save();
    console.log(cartData);
    response
      .status(200)
      .send({ success: true, message: "Add data to buy_order" });
  } catch (error) {
    response.status(200).send({ success: false, message: "Order Fail...!" });
  }
};
