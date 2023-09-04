import Book from "../models/bookModel.js";

 class BookController{
    async addBook(req, res, imageName) {
        try {
          const data = await Book.create({ ...req.body, image: imageName });
          console.log(data);
          if (data) {
            res.json(data);
          } else
            res.json({ success: false, message: "Error during Adding the book." });
        } catch (err) {
          return res.json({
            success: false,
            message: "Error whilte Quering in Database",
          });
        }
      }

}

export default new BookController()