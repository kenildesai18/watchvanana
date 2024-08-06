import express from "express";
import multer from "multer";
import {
  userSignup,
  userLogin,
  find_otp,
  dashbord,
} from "../controller/user_controller.js";
import {
  getOredr,
  AdminOredr,
  AdminAdd,
  AdminRemove,
  AdminUpdate,
  getProducts,
  getProductsById,
  updateProductsById,
  getUser,
  getProductsById1,
} from "../controller/product_controller.js";
import { getBrands } from "../controller/brand_controller.js";
import checkAuth from "../checkAuthentication/checkAuth.js";
import getData from "../verification/getData.js";
const router = express.Router();
// import {updatePassword} from '../controller/update_password.js'
import {
  addTocart,
  buyOrder,
  getProduct,
  removeFromcart,
  get_cart_detail,
} from "../controller/cart_controller.js";
import {
  updatePassword,
  forget_password,
  find_uname_cpassword,
} from "../controller/user_controller.js";

router.post("/api/add-to-cart", addTocart);
router.post("/api/remove-from-cart", removeFromcart);
router.post("/api/cartProduct", getProduct);
router.post("/api/updatePassword", updatePassword);
router.post("/api/forget-password", forget_password);
router.post("/api/find-opt", find_otp);
router.post("/api/find-uname-pass", find_uname_cpassword);

//Buyorder
router.post("/api/buy-order", buyOrder);

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/token", getData);
// router.use("/api", cart_route);

router.get("/products", getProducts);
router.get("/brands", getBrands);
router.get("/products/:id", getProductsById);
router.get("/products/:id/:quanty", updateProductsById);

router.get("/user/:username", getUser);
router.get("/order/:username", getOredr);
router.get("/dashbord", dashbord);
// get_cart_detail
router.get("/get-data-of-cartSchema/:username/:pid", get_cart_detail);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photo/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;
  res.json({ imagePath });
});

// admin
router.get("/admin/order", AdminOredr);
router.post("/admin/create-item", AdminAdd);
router.post("/admin/remove-item", AdminRemove);
router.post("/admin/update-item", AdminUpdate);

router.get("/products-id/:id", getProductsById1);

export default router;
