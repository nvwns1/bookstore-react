import React, { useContext, useEffect } from "react";
import bookContext from "../context/book/BookContext";
import BookItem from "./BookItem";

export default function Home() {
  const context = useContext(bookContext);
  const { books, getBooks } = context;

  useEffect(() => {
    getBooks(); //eslint-disable-next-line
  }, []);
  return (
    <div className="">
      <h1 style={{ margin: "0 20px" }}>All Book</h1>
      <div className="container">
        {books.length === 0 && "No Books to display"}
        {books.map((book) => (
          <BookItem key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
