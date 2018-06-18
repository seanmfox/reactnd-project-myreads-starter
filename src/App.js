import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCategory from './BookCategory'
import ListBooks from './ListBooks'

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
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books)
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
    this.setState({ query: query.trim() })
  }


  render() {

    const { query } = this.state

    let results = []
    if (query) {
    BooksAPI.search(query).then(data => {
      results = data
      console.log(results)
    })
    }

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
            <div className="search-books-results">
              <ol className="books-grid">
              {results.map((book) => (
                      <li key={book.id}>
                        <div className="book">
                        {/* <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                          <BookCategory 
                          shelf={book.shelf}
                          onRecategorizeBook={(category) => {
                            this.recategorizeBook(book, category)
                          }}/>
                      </div> */}
                      <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.join(', ')}</div>
                      </div>
                      </li>
                    ))}
              </ol>
            </div>
          </div>
        ) : (          
        <div>
          <ListBooks 
            books = {this.state.books}
            onBookUpdate = {(book, category) => { this.bookUpdate(book, category)}}
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
