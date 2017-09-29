import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends Component {
  static propTypes = {
      booksOnShelf: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired
    }
    state = {
      query: '',
      books: []
    }

    updateQuery = (query) => {
      if (!query) {
        this.setState({query: '', books: []})
      } else {
        this.setState({ query: query.trim() })
        BooksAPI.search(query).then((books) => {
          if(books.length){
              books.forEach((book, index) => {
                  let displayedBooks = this.state.books.find((b) => b.id === book.id)
                  book.shelf = displayedBooks ? displayedBooks.shelf : 'none'
              })
          }
          if (books.error) {
            books = []
          }
          this.setState({books})
        })
      }
    }
    render () {
      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.books.map(book => (
                      <Book
                        changeShelf={this.props.changeShelf}
                        key={book.id}
                        book={book}
                      />
                    ))
                  }
                </ol>
              </div>
            </ol>
          </div>
        </div>
      )
    }
  }

export default Search
