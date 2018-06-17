import React, { Component } from 'react';

class BookCategory extends Component {
  recategorizeBook = (e) => {
    this.props.onRecategorizeBook(e.target.value)
  }

  render() {
    return (
    <div className="book-shelf-changer">
      <select value={this.props.shelf} onChange={this.recategorizeBook}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
    )
  }
}

export default BookCategory