import React, { Component } from 'react'
import * as BooksApi from './BooksAPI'
import Book from './Book';
import Link from 'react-router-dom/Link';
import {DebounceInput} from 'react-debounce-input'

class BookSearch extends Component {
  state = {
    searchResults: []
  }

  handleSearchInput = (query) => {
    if(query === '') {
      this.setState({searchResults: []})
    }
    else {
      BooksApi.search(query)
      .then(res => {
        if(res.hasOwnProperty('error')){
          this.setState({searchResults: []})
        }
        else {
          this.markBookStatus(res)
        }
      })
    }
    
  }

  markBookStatus(books) {
    const localBooks = this.props.books
    books.forEach(((book, index) => {
      let foundBook = localBooks.find(b => b.id === book.id)
      book.shelf = foundBook ? foundBook.shelf : 'none'
      books[index] = book
    }))

    this.setState({searchResults: books})
  }

  render() {
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close </Link>
        <div className="search-books-input-wrapper">
          <DebounceInput 
            minLength={1} 
            debounceTimeout={400} 
            placeholder="Search by title or author"
            onChange={e => this.handleSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.searchResults.map(book => <li key={book.id}> <Book handleChange={this.props.handleUpdate} book={book} /> </li>)}
        </ol>
      </div>
    </div>
    )
  }
}

export default BookSearch