import React, { useState } from "react";
import API from "../utils/API";
import { Container,  Input, Header, Item } from 'semantic-ui-react';
import "./Search.css";
import BookItem from "../components/BookItem";
import bookImg from "../images/book.png"


function Search() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   loadBooks()
  // }, [])

  // function loadBooks() {
  //   API.getBooks()
  //     .then(res => 
  //       setBooks(res.data)
  //     )
  //     .catch(err => console.log(err));
  // };

  function saveBook(id) {
    const book = books.filter(book => book.id === id)[0]
    API.saveBook(book)
      .then(res => console.log('book saved'))
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (search) {
      API.searchBook(search)
        .then(res => {
          setBooks(res.data.items.map(book => {
            return {
              id: book.id,
              title: book.volumeInfo.title,
              authors:  book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '...',
              description: book.volumeInfo.description,
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookImg,
              link: book.volumeInfo.previewLink.split('&')[0]
            }
            }));
            setSearch('');
        })
        .catch(err => console.log(err));
    };
  };
    return (
      <Container>
            <form onSubmit={handleFormSubmit}>
              <Input
                className="search"
                onChange={handleInputChange}
                name="title"
                icon="search"
                placeholder="Search for title... "
                value={search}
              />
            </  form>
            {books.length ? (
              <Item.Group divided>
                {books.map(book => (
                  <BookItem 
                    key={book.id}
                    title={book.title}
                    authors={book.authors}
                    description={book.description}
                    src={book.image}
                    link={book.link}
                    handleSave={saveBook}
                    bookId={book.id}
                  />
                ))}
              </Item.Group>
            ) : (
              <Header as="h3" color="grey">Type book title to search...</Header>
            )}
      </Container>
    );
  }


export default Search;
