import React, { Component } from 'react'

class Book extends Component {
  
  handleUpdate = (e) => {
    this.props.handleChange(this.props.book, e)
  }

  render() {
    const { imageLinks, shelf, title, authors} = this.props.book

    return  (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imageLinks && imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={shelf} onChange={this.handleUpdate}>
              <option value="movedTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors.map(a => `${a} `)}</div>
      </div>
    )
  }
}

export default Book