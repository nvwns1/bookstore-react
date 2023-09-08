import { Router } from "express";
import bookController from "../controllers/bookController.js";
import multer from "multer";
import Book from "../models/bookModel.js";

const router = Router();

let imageName;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    //rename the file name to avoid naming conflict
    imageName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname.trim();
    cb(null, imageName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
    }
  },
});
router.post("/add", upload.single("image"), (req, res) => {
  bookController.addBook(req, res, imageName);
});
router.get("/:id", bookController.getBookById);

router.put("/:id", bookController.updateBookById);

router.delete("/:id", bookController.deleteBookById);

export default router;
