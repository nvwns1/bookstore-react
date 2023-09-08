import {Router} from "express";
import { body, validationResult }  from "express-validator";
import userController from "../controllers/userController.js";

const router = Router();

router.post("/createUser", [
    body("username", "Enter a valid Name").isLength({min: 3}),
    body("name", "Enter a valid Name").isLength({min: 3}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 6 character").isLength({min: 6}),
], 
userController.createUser
)

router.post("/login", 
userController.authenticate
)

export default router;