import axios from "axios";
import openSocket from 'socket.io-client';
const  socket = openSocket();

export default {
  // Search for title at Google books
  searchBook: function(search) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20`);
  },
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  // API to subscribe to socket.io on server to recieve update notifications
  subscribeToUpdates: function(update, cb){
    socket.on('update', newUpdate => cb(newUpdate));
    if (update) {
      socket.emit('favoriteUpdate', update);
    };
  }
};
