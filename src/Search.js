import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: '',
    results: []
  }

  onBookUpdate(book, category) {
    this.props.bookUpdate(book, category)
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    this.updateResults(query)
  }

  updateResults = (query) => {
    if(query !== "") {
    BooksAPI.search(query).then(data => {
      if (!data.error) {
      this.setState({results: data })
    } else {
      this.setState({results: []})
    }
    })
  } else {
    this.setState({results: []})
  }
  }


  render() {

    const { books } = this.props

    const { query, results } = this.state

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>

        </div>
      </div>

      <div className="search-books-results">
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