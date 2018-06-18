import React, { Component } from 'react'
import Book from './Book';
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  onBookUpdate(book, category) {
    this.props.bookUpdate(book, category)
  }
  

  render() {
    const {books} = this.props
    const shelfOptions = [{shelfName: 'currentlyReading', displayName: 'Currently Reading'},
                          {shelfName: 'wantToRead', displayName: 'Want to Read'},
                          {shelfName: 'read', displayName: 'Read'}]
    return (
      <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfOptions.map((shelfing) => (
              <div className="bookshelf" key={shelfing.shelfName}>
                <h2 className="bookshelf-title">{shelfing.displayName}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book) => book.shelf === `${shelfing.shelfName}`).map((book) => (

                      <Book 
                        key = {book.id}
                        book={book}
                        books={books}
                        onRecategorizeBook = {(category) => { this.onBookUpdate(book, category)}}/>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
                  <div className="open-search">
                  <Link 
                  to="/search"
                  >Add a book</Link>
                </div>
                </div>
    )
  }
}

export default ListBooks