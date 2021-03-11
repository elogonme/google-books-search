import React, { useState } from "react";
import API from "../utils/API";
import { Container,  Input, Header, Item } from 'semantic-ui-react';
import { useStoreContext } from "../utils/GlobalState";
import "./Search.css";
import BookItem from "../components/BookItem";
import bookImg from "../images/book.png"
import { SAVE_SEARCH, CLEAR_SEARCH, ADD_FAVORITE, LOADING } from "../utils/actions";

function Search() {
  const [state, dispatch] = useStoreContext();
  const [search, setSearch] = useState('');

  function saveBook(id) {
    dispatch({ type: LOADING });
    const book = state.books.filter(book => book.id === id)[0]
    API.saveBook(book)
      .then(res => dispatch({
        type: ADD_FAVORITE,
        favorite: res
      }))
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (search) {
      dispatch({ type: LOADING });
      API.searchBook(search)
        .then(res => {
          dispatch({
            type: SAVE_SEARCH,
            books: res.data.items.map(book => {
            return {
              id: book.id,
              title: book.volumeInfo.title,
              authors:  book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '...',
              description: book.volumeInfo.description,
              image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : bookImg,
              link: book.volumeInfo.previewLink.split('&')[0]
            }
            })
          });
            setSearch('');
        })
        .catch(err => console.log(err));
    };
  };
    return (
      <Container>
            <form onSubmit={handleFormSubmit}>
              <Input 
                loading={state.loading}
                className="search"
                onChange={handleInputChange}
                name="title"
                icon="search"
                placeholder="Search for title... "
                value={search}
              />
            </  form>
            {state.books.length ? (
              <Item.Group divided>
                {state.books.map(book => (
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
