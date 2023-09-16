import jwt from "jsonwebtoken"
import "dotenv/config";
import User from "../models/userModel.js";

export default async function isAdmin(req, res, next) {
  const token = req.header('auth-token')
  if(!token){
    return res.status(401).json({ message: "Access denied", success: false });
  }
 try {
  const data = jwt.verify(token, process.env.JWT_SECRET)
  const userId = data.id
  const user = await User.findById(userId);
  if(user && user.role === 'admin'){
    //if user is admin
    next()
  }else{
    return res.status(401).json({ message: "problem denied", success: false });
  }
 } catch (error) {
  console.log(error)
  return res.status(500).json({ message: "Internal Server Error", success: false });
 }
}
