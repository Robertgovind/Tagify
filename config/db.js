import mongoose from "mongoose";

const dbConnection = async () => {
  await mongoose
    .connect(`${process.env.DB_URL}/tagify`)
    .then(() => {
      console.log("Database connection is established");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default dbConnection;
