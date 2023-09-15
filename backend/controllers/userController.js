import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {  validationResult } from "express-validator";
import "dotenv/config";
import jwt from "jsonwebtoken";

class UserController {
  async createUser(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const errormsg = errors.array().map(error=>error.msg)
      return res.status(400).json({message: errormsg, success: false})
    }
    try {
      const userExist = await User.findOne({username: req.body.username})
      if(userExist){
        return res.status(400).send({message: "Username already Exists", success: false})
      }

      const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUND);
      const plainText = req.body.password;
      const hashed = bcrypt.hashSync(plainText, saltRounds);

      const response = await User.create({ ...req.body, password: hashed });
      if (response == null) return res.json([]);
      else {
        const token = jwt.sign({id: response.id}, process.env.JWT_SECRET);
        return res.status(200).json({message: "User created Successfully", success: true, token})}
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", success: false });
    }
  }

  async authenticate(req, res) {
    try {
      const response = await User.findOne({ username: req.body.username });
      if (response == null) {
        return res.status(400).json({ message: "Username doesnot exist." });
      } else {
        const match = bcrypt.compareSync(req.body.password, response.password);
        if (match) {
          const token = jwt.sign({id: response.id}, process.env.JWT_SECRET);
          return res
            .status(200)
            .json({ message: "User Login Success", success: true, token});
        }else{
          return res
          .status(200)
          .json({ message: "Username and password doesnot match.", success: false});
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }

  async getUserList(req, res) {
    try {
      const response = await User.find();
      if (response == null) {
        return res.status(400).json({ message: "user doesnot exist" });
      }
      return res.status(200).json(response);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal Server Error", success: false });
    }
  }
}

export default new UserController();
