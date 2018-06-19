import React, { Component } from 'react';

class Book extends Component {

  recategorizeBook = (e) => {
    this.props.onRecategorizeBook(e.target.value)
  }

  shelfValue(book, books) {
    let bookMatch = books.find(b => b.id === book.id)
    return (bookMatch ? bookMatch.shelf : "none")
  }

  render() {
    const {book, books} = this.props
    
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>}
          <div className="book-shelf-changer">
            <select value={this.shelfValue(book, books)} onChange={this.recategorizeBook}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
          </div>
        <div className="book-title">{book.title}</div>
          {book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}
        </div>
      </li>
    );
  }
}

export default Book;