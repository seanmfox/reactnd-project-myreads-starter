import React, { Component } from 'react';
import Book from './Book';

class Search extends Component {
  onBookUpdate(book, category) {
    this.props.bookUpdate(book, category)
  }

  render() {

    const {bookSearch, books} = this.props
    return (
      <div className="search-books-results">
      <ol className="books-grid">
        {bookSearch.map((book) => (
          <Book
            key={book.id}
            books = {books}
            book={book}
            onRecategorizeBook = {(category) => { this.onBookUpdate(book, category)}}
            />
                    ))}
                    </ol>
            </div>
    );
  }
}

export default Search;