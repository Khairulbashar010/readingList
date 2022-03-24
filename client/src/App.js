import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
  const [books, setBooks] = useState([]);

  const getBooksData = async () => {
    await axios.get('http://localhost:5001')
      .then(res => {
        setBooks(res.data);
      })
  }

  useEffect(() => {
    getBooksData()
  }, [])
  
  return (
    <div className="App">
      <div className="heading">My Reading List</div>
      <div className="container">
        <BookList books={books} updateBooks={getBooksData}/>
        <AddBook setBooks={setBooks}/>
      </div>
    </div>
  );
}

export default App;
