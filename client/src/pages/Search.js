import React, { useState } from "react";
import API from "../utils/API";
// Using React Semantic UI for components
import { Container,  Input, Header, Item } from 'semantic-ui-react';
import { useStoreContext } from "../utils/GlobalState";
import "./Search.css";
import BookItem from "../components/BookItem";
import bookImg from "../images/book.png"
import { SAVE_SEARCH, ADD_FAVORITE, LOADING } from "../utils/actions";
// Search page component to perform and store search results
function Search() {
  const [state, dispatch] = useStoreContext();
  const [search, setSearch] = useState('');
  // Save Book handler function on click of save button
  function saveBook(id) {
    dispatch({ type: LOADING });
    const book = state.books.filter(book => book.id === id)[0];
    API.subscribeToUpdates(book, (response) => console.log('received saved update: ',response));
    API.saveBook(book)
      .then(res => dispatch({
        type: ADD_FAVORITE,
        favorite: res
      }))
      .catch(err => console.log(err));
  }
  // Input change handler to display and get text from input field
  function handleInputChange(event) {
    setSearch(event.target.value);
  };

  // Function to perform search using API and save search results
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
  // JSX for displaying Search list items
  return (
    <Container>
          <form onSubmit={handleFormSubmit}>
            <Input
              action='Search'
              loading={state.loading}
              className="search"
              onChange={handleInputChange}
              name="title"
              icon="search"
              iconPosition='left'
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
            <Header as="h3" color="grey">Type book title or author to search...</Header>
          )}
    </Container>
  );
}

export default Search;
