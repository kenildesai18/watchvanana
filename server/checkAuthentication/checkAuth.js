import { request } from 'express';
import {getToken} from '../verification/verifyAuth.js'

async function checkAuth(req,res,next) {
  console.log(req);
  const token = req.body.token;
  
  // const cookieHeader = request.headers?.cookies;
  // const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    // next();
    return null;
  }

  const data = getToken(token);
  if (!data) {
    return null;
  }
  next();
}

export default checkAuth;