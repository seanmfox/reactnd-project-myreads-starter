import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search';

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query: '',
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
  })}

  bookUpdate(book, category) {
    BooksAPI.update(book, category).then((r) => {
      book['shelf'] = category
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
    console.log(this.state.books)
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

    const { query, books, results } = this.state

    return (
      <div className="app">
        {this.state.showSearchPage ? (
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
                <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateQuery(e.target.value)}/>

              </div>
            </div>

              <Search 
                books = {books}
                bookSearch = {results}
                bookUpdate = {(book, category) => { this.bookUpdate(book, category)}}
              />
          </div>
        ) : (          
        <div>
          <ListBooks 
            books = {books}
            bookUpdate = {(book, category) => { this.bookUpdate(book, category)}}
            />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
        </div>
        )}
      </div>
    )
  }
}

export default BooksApp
