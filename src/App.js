import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search';
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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


  render() {

    const { books } = this.state

    return (
      <div className="app">
             
          <Route 
            exact path="/" render={() => (
              <ListBooks 
                books = {books}
                bookUpdate = {(book, category) => { this.bookUpdate(book, category)}}
              />
            )}
          />
          <Route
          path="/search" render={() => (
            <Search 
            books = {books}
            bookUpdate = {(book, category) => { this.bookUpdate(book, category)}}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
