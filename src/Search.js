import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: '',
    results: []
  }

  onBookUpdate = (book, category) => {
    this.props.bookUpdate(book, category)
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.updateResults(query)
  }

  updateResults(query) {
    if(query !== "") {
    BooksAPI.search(query).then(data => {
      if (!data.error) {
      this.setState({results: data })
    } else {
      this.clearResults()
    }
    })
    } else {
      this.clearResults()
    }
  }

  clearResults = () => {
    this.setState({results: []})
  }

  render() {
    const { books } = this.props
    const { query, results } = this.state
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {results.length === 0 && (<p className="book-error">No books available for your current search parameters</p>) }
             <ol className="books-grid">
              {results.map((book) => (
                <Book
                  key={book.id}
                  books = {books}
                  book={book}
                  onRecategorizeBook = {(category) => { this.onBookUpdate(book, category)}}
                />
              ))}
            </ol>
        </div>
      </div>
    );
  }
}

export default Search;