import React, { createContext, useReducer, useContext } from "react";
import {
    SAVE_SEARCH,
    CLEAR_SEARCH,
    ADD_FAVORITE,
    UPDATE_FAVORITES,
    REMOVE_FAVORITE,
    LOADING,
  } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;
const reducer = (state, action) => {
    // console.log(action, state);
    switch (action.type) {
      case SAVE_SEARCH:
        return { ...state,
          books: action.books,
          loading: false
        };
  
      case CLEAR_SEARCH :
        return { ...state,
          books: [],
          loading: false
        };
  
      case UPDATE_FAVORITES :
        return {
          ...state, 
          favorites: action.favorites,
          loading: false
        };
  
      case ADD_FAVORITE :
        return { 
          ...state, 
          favorite: [action.favorite, ...state.favorites],
          loading: false
        };

      case REMOVE_FAVORITE :
        return { 
          ...state, 
          favorites: state.favorites.filter(favorite => favorite._id !== action.id),
          loading: false
        };
  
      case LOADING :
        return { ...state, loading: true};
      
    default:
      return state;
    }
  };
  
  const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        search: '',
        favorite: '',
        books: [],
        favorites: [],
        loading: false
    });
  
    return <Provider value={[state, dispatch]} {...props}/>;
  };
  
  const useStoreContext = () => useContext(StoreContext);
  
  export { StoreProvider, useStoreContext };
  