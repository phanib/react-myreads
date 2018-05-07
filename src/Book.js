import React, { Component } from 'react'

class Book extends Component {
  
  handleUpdate = (e) => {
    this.props.handleChange(this.props.book, e)
  }

  render() {
    return  (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={this.handleUpdate}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors.map(a => `${a} `)}</div>
      </div>
    )
  }
}

export default Book