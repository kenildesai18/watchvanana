import { getToken } from "../verification/verifyAuth.js";

const getData = async (request, response) => {
  try {
    const token = request.body.token;
    // console.log(request.body);
    const user = getToken(token);
    
    if (user) {
      return response.status(200).json({ data: user });
    } 
    else{
        return response.status(400).json({data: "User Does Not Exist"})
    }
  } catch (error) {
    return response.status(200).json("Server Error");
  }
};

export default getData;