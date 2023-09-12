import Book from "../models/bookModel.js";

class BookController {
  async addBook(req, res, imageName) {
    try {
      const data = await Book.create({
        ...req.body,
        image: "http://localhost:8000/public/uploads/" + imageName,
      });
      console.log(data);
      if (data) {
        res.json(data);
      } else
        res.json({ success: false, message: "Error during Adding the book." });
    } catch (err) {
      console.log(err.message);
      return res.json({
        success: false,
        message: err.message,
      });
    }
  }

  async getBookById(req, res) {
    const { id } = req.params;
    try {
      const response = await Book.findById(id);
      res.json(response);
    } catch (err) {
      return res.json({
        success: false,
        message: "Error whilte Quering in Database",
      });
    }
  }

  async getAllBooks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
      const skip = (page - 1) * limit; //calculate number of document to skip
      const totalBooks = await Book.countDocuments();

      const books = await Book.find().skip(skip).limit(limit);
      res.json({
        books,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({error: "Error Fetching books"})
    }
  }

  async updateBookById(req, res) {
    const { id } = req.params;
    const { title, author, price, category, description } = req.body;
    try {
      const book = await Book.findById({ _id: id });
      if (!book) {
        res.status(404).send({ success: "false", message: "book not found" });
      }
      book.title = title;
      book.author = author;
      book.price = price;
      book.category = category;
      book.description = description;
      await book.save();
      res.status(201).send({ success: true, message: "updated" });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }

  async deleteBookById(req, res) {
    const { id } = req.params;
    try {
      const response = await Book.deleteOne({
        _id: id,
      });
      res.json(response);
    } catch (err) {
      return res.json({
        success: false,
        message: "Error whilte Quering in Database",
      });
    }
  }
}

export default new BookController();
