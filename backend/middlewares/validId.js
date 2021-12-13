import mongoose from "mongoose";

//Valida que el ID que ingresa si es un objectId para Mongoose
const validId = async (req, res, next) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params["_id"]);
  return !validId ? res.status(400).send("Invalid id") : next();
};

export default validId;
