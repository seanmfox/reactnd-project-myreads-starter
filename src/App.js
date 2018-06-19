import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import Search from './Search';
import { Route } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
  })}

  bookUpdate(book, category) {
    BooksAPI.update(book, category).then((r) => {
      book['shelf'] = category
      if(category === 'none') {
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id)
        }))    
      } else {
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }))
      }  
    })
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