import { useState } from "react";
import BookContext from "./BookContext";

const BookState = (props) => {
  const host = " http://localhost:8000";
  const initialBooks = [];
  const [books, setBooks] = useState(initialBooks);

  //Get All books
  const getBooks = async () => {
    try {
      const response = await fetch(`${host}/api/book/getAllBooks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //Check if the response indicates an error
      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const json = await response.json();
      setBooks(json.books);
    } catch (error) {
      console.log("An error occured.".error);
    }
  };
  return (
    <BookContext.Provider value={{ books, getBooks }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
