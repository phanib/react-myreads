import React from 'react'

function Book({book, handleChange}) {
  
  const { shelf, title, authors} = book
  const bookThumbnail = book.imageLinks ? book.imageLinks.thumbnail : "http://via.placeholder.com/128x193?text=No%20Cover"
  
  return  (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookThumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf} onChange={e => handleChange(book, e)}>
            <option value="movedTo" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{Array.isArray(authors)?authors.join(', '):''}</div>
    </div>
  )
}

export default Book