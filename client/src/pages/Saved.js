import React, { useEffect } from "react";
import { Container, Item, Header } from 'semantic-ui-react';
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import BookItem from "../components/BookItem";
import "./Saved.css"
import { UPDATE_FAVORITES ,REMOVE_FAVORITE, LOADING } from "../utils/actions";

function Saved() {
  const [state, dispatch] = useStoreContext();
  // const [savedBooks, setSavedBooks] = useState([]);
  let favorites = state.favorites;
  useEffect(() => {
    loadBooks();
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res => {
        dispatch({
          type: UPDATE_FAVORITES,
          favorites: res.data
        })
      return res
      }
      )
      .catch(err => console.log(err));
  };

  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => {
        // loadBooks();
        dispatch({
          type: REMOVE_FAVORITE,
          id: id
        })
      })
      .catch(err => console.log(err));
  }
  return (
    <Container>
      {state.favorites.length ? (
        <Item.Group divided>
          {state.favorites.map(book => (
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
