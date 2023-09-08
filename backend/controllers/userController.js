import User from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserController {
  async createUser(req, res) {
    try {
        const saltRounds = 10;
        const plainText = req.body.password
        const hashed = bcrypt.hashSync(plainText, saltRounds)
      const response = await User.create({ ...req.body, password: hashed });
      if (response == null) return res.json([]);
      else res.json(response);
    } catch (error) {
      res.status(400).json({ message: "User with same details exists." });
    }
  }

  async authenticate(req, res) {
    try {
      const response = await User.findOne({username: req.body.username})
      if (response == null){
          return res.status(400).json({ message: "user doesnot exist" });
      }
      else {
        const match = bcrypt.compareSync(req.body.password, response.password);
        if (match) {
          return res.status(200).json({message: "user login success", success: true})
        }
      }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", success: false})
    }
  }
}

export default new UserController();
