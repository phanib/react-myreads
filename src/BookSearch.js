import React, { Component } from 'react'
import * as BooksApi from './BooksAPI'
import Book from './Book';

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
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
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