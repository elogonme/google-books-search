import React, { useState, useEffect } from "react";
import { Container, Item, Header } from 'semantic-ui-react';
import API from "../utils/API";
import BookItem from "../components/BookItem";
import "./Saved.css"

function Saved() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => 
        setSavedBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }
  return (
    <Container>
      {savedBooks.length ? (
        <Item.Group divided>
          {savedBooks.map(book => (
              // <Link to={"/books/" + book.id}>
                <BookItem 
                  key={book._id}
                  deleteBtn={true}
                  title={book.title}
                  authors={book.authors}
                  description={book.description}
                  src={book.image}
                  link={book.link}
                  handleDelete={deleteBook}
                  bookId={book._id}
                />
              // </Link>
          ))}
        </Item.Group>
      ) : (
        <Header as="h3" color="grey" className="no-saved">You have not saved any books...</Header>
      )}
    </Container>
  );
}

export default Saved;
