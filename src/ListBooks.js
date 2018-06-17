import React, { Component } from 'react'
import BookCategory from './BookCategory'

class ListBooks extends Component {
    render() {
      const {books} = this.props
      const shelfOptions = [{shelfName: 'currentlyReading', displayName: 'Currently Reading'},
                            {shelfName: 'wantToRead', displayName: 'Want to Read'},
                            {shelfName: 'read', displayName: 'Read'}]
       return (
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
                        <li key={book.id}>
                          <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <BookCategory shelf={book.shelf}/>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                        </li>
                      ))}
                    </ol>
                </div>
              </div>
              ))}
            </div>
            </div>
        </div>
        )
    }
}

export default ListBooks