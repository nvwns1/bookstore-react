import express from "express";
import connectToDB from "../config/db.js";
import bookRouter from "../routes/book.js";
import userRouter from "../routes/userRoutes.js";

const app = express();
const port = 8000;
connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/book", bookRouter);
app.use("/auth", userRouter);


app.listen(port, async () => {
  console.log(`website listening at http://localhost:${port}`);
});
