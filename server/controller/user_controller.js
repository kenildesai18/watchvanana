// backend api
// api is always 2 parameter req & res

// import user schema
import { request, response } from "express";
import config from "../config/config.js";
import User from "../model/user_schema.js";
import jwt from "jsonwebtoken";
const secret = "Darsh$2003";

import nodemailer from "nodemailer";
import randomstring from "randomstring";

import bcrypt from "bcrypt";
import setToken from "../verification/verifyAuth.js";
import OTP from "../model/otp_schema.js";
import { renderMatches } from "react-router-dom";
import buyOrderdata from "../model/buy_schema.js";

export const userSignup = async (request, response) => {
  try {
    // console.log(request.body);
    const { email, password, username } = request.body;

    const exitst = await User.findOne({ username });

    console.log(exitst);
    if (exitst) {
      return response
        .status(401)
        .json({ message: " username is already exist " });
    }

    // var hasPass = await bcrypt.hash(password, 12);
    // var ans = email.search("@charusat.edu.in");
    // var flag = ans == -1 ? false : true;
    // password = hasPass;
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();
    // const re = await User.find().select("-username");
    // console.log(" d a t a => ", re);

    response.status(200).json({ message: user });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let user = await User.findOne({ username: username, password: password });
    
    console.log(user);
    if (user) {
      const token = setToken(user);
      console.log(token);
      if (user.username == "omitaliya" && user.password == "Omitaliya@2525") {
        return response.status(200).json({ data: user, token });
      }
      return response.status(200).json({ data: user, token });
    } else {
      return response.status(200).json("Invalid Login");
    }
  } catch (error) {
    return response.status(200).json("Server Error");
  }
};

export const updatePassword = async (request, response) => {
  try {
    console.log("body = ", request.body);
    const username = request.body.username;
    const password = request.body.password;
    const cpassword = request.body.cpassword;

    console.log(username);
    console.log(password);
    console.log(cpassword);

    const data = await User.findOne({
      username: username,
      password: password,
    });
    console.log("data = ", data);
    if (data) {
      const user = await User.findOneAndUpdate(
        { username: username },
        {
          $set: {
            password: cpassword,
          },
        }
      );
      response
        .status(200)
        .json({ success: true, message: "User password update...!" });
    } else {
      response
        .status(200)
        .json({ success: false, message: "User password Not update...!" });
    }
  } catch (error) {
    response.status(200).json({ success: false, message: "error is server" });
  }
};

export const forget_password = async (request, response) => {
  const username = request.body.username;
  const email = request.body.email;
  let user = await User.findOne({ username: username, email: email });
  console.log("user = ", user);

  if (user) {
    var digits = "0123456789";

    var otpLength = 4;

    var otp = "";

    for (let i = 1; i <= otpLength; i++) {
      var index = Math.floor(Math.random() * digits.length);

      otp = otp + digits[index];
    }

    const fe = await OTP.findOne({ username: username });
    // console.log("fe = ", fe);
    if (fe != null) {
      console.log(username, otp);

      let da = await OTP.findOne({ username: username }).updateOne({
        $set: { otp: otp },
      });
      // console.log(da);
    } else {
      const otp_obj = new OTP({
        username: username,
        email: email,
        otp: otp,
      });
      const otpData = await otp_obj.save();
      // console.log(" = = == ", otp_obj);
    }

    // console.log("otp = ", otp);

    let transporter = nodemailer.createTransport(
      {
        service: "Gmail",
        auth: { user: "gdm72850@gmail.com", pass: "tvqy fiwq urkb jlei" },
      },
      {
        from: "Vandana Times gdm72850@gmail.com",
      }
    );

    let mess = {
      from: "Vandana Times gdm72850@gmail.com",
      to: user.email,
      subject: "Reset password",
      html: "<p> Hii " + user.username + "this si your OTP : " + otp,
    };

    transporter
      .sendMail(mess)
      .then((info) => {
        response
          .status(200)
          .json({ info: info, message: "Message Send Successfully" });
      })
      .catch((error) => {
        response
          .status(200)
          .json({ error: error, message: "Mail Does Not Send" });
      });
  } else {
    response.status(200).json({ message: "Email OR User Not Exits...!" });
  }
};

export const find_otp = async (request, response) => {
  const otp = request.body.otp;
  console.log("otp = ", request.body.otp);
  const obj = await OTP.findOne({ otp: otp });
  console.log("obj", obj);
  try {
    if (obj) {
      response.status(200).send({ message: "true" });
    } else {
      console.log("tata");
      response.status(200).send({ message: "false" });
    }
  } catch (error) {
    response.status(200).send({ message: "server error...!" });
  }
};

export const find_uname_cpassword = async (request, response) => {
  const password = request.body.update.password;
  const username = request.body.uname;

  console.log(" = > ", password);
  console.log(" = > ", username);
  try {
    console.log(request.body);
    let da = await User.findOne({ username: username }).updateOne({
      $set: { password: password },
    });
    console.log(" = = ", da);
    response.status(200).send({ message: "Forget Password Successfully" });
  } catch (error) {
    response.status(200).send({ message: "Forget Password Not Successfully" });
  }
};

export const dashbord = async (request, response) => {
  try {
    const data = await buyOrderdata.find({});
    response.status(200).send({ message: data });
  } catch (error) {
    response.status(200).send({ message: "Data Not Found...!" });
  }
};
