import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book';
import BookShelf from './BookShelf';
import * as BooksApi from './BooksAPI'
import BookSearch from './BookSearch';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searchResults: [],
    books: {
      currentlyReading:[],
      read:[],
      wantToRead:[]
    }
  }

  flattenBooksData = () => [...this.state.books.currentlyReading, ...this.state.books.read, ...this.state.books.wantToRead]
  

  fetchAndSortBooks() {
    BooksApi.getAll()
    .then(books => this.sortBooks(books))
  }
  
  componentDidMount() {
    this.fetchAndSortBooks()
  }

  sortBooks = (books) => {
    let books_data = {}
    books_data['currentlyReading'] = books.filter(book => book.shelf === 'currentlyReading')
    books_data['read'] = books.filter(book => book.shelf === 'read')
    books_data['wantToRead'] = books.filter(book => book.shelf === 'wantToRead')
    this.setState({books: books_data})
  }

  handleChange = (book, e) => {
    BooksApi.update(book, e.target.value)
      .then(resp => this.fetchAndSortBooks())
  }

  

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => <BookSearch handleUpdate={this.handleChange} books={this.flattenBooksData()}/>} />
        <Route exact path='/' render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf handleChange={this.handleChange} books={this.state.books.currentlyReading} title="Currently Reading" />
              <BookShelf handleChange={this.handleChange} books={this.state.books.wantToRead} title="Want To Read" />
              <BookShelf handleChange={this.handleChange} books={this.state.books.read} title="Read" />
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'> Add a book </Link>
          </div>
        </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
