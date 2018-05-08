import React, { Component } from 'react'
import * as BooksApi from './BooksAPI'
import Book from './Book';
import Link from 'react-router-dom/Link';

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
    const markedBooks = books.map(book => {
      localBooks.map(lb => {
        if(lb.id === book.id) {
          book['shelf'] = lb.shelf
        }
        else {
          book['shelf'] = 'none'
        }
      })
      return book
    })
    this.setState({searchResults: markedBooks})
  }

  render() {
    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close </Link>
        <div className="search-books-input-wrapper">
          <input onChange={e => this.handleSearchInput(e.target.value)} type="text" placeholder="Search by title or author"/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.searchResults.map(book => <Book handleChange={this.props.handleUpdate} book={book} />)}
        </ol>
      </div>
    </div>
    )
  }
}

export default BookSearch