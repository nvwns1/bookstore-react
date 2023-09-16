import React from "react";

export default function BookItem(props) {
  const { book } = props;
  return (
    <div className="card">
      <img src={book.image} alt="Book" height={"200px"} />
      <div className="side">
        <h2>{book.title}</h2>
        <p>
          Author: {book.author} <br />
          Price: RS. {book.price}
        </p>
      </div>
    </div>
  );
}
