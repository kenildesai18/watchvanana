import mongoose from "mongoose";

export const Connection = async (username,password)=>{
    mongoose
      .connect(
        `mongodb://localhost:27017`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));
}

export default Connection;