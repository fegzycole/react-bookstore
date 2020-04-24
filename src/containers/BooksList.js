import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../components/Book';
import actions from '../actions/index';
import db from '../firebase/config';

const { removeBook, createBook } = actions;

class BookList extends Component {
  async componentDidMount() {
    const { createBook } = this.props;
    const ref = db.collection('bookstore');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        // eslint-disable-next-line
        if (change.type = 'added') {
          const { doc } = change;

          const book = {
            id: doc.id,
            title: doc.data().title,
            category: doc.data().category,
          };

          createBook(book);
        }
      });
    });
  }

  render() {
    const { books, filter, removeBook } = this.props;
    const handleRemoveBook = book => {
      db.collection('bookstore').doc(book.id).delete()
        .then(removeBook(book))
        .catch(error => new Error(error.message));
    };
    const bookCategory = filter === 'CATEGORIES' ? books : books.filter(book => book.category === filter);

    const showBooks = bookCategory.length > 0 ? (bookCategory.map(book => (
      <Book book={book} key={Math.random() * 30} removeBook={handleRemoveBook} />
    ))) : null;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showBooks}
          </tbody>
        </table>
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  removeBook: PropTypes.func,
  createBook: PropTypes.func,
  filter: PropTypes.string.isRequired,
};

BookList.defaultProps = {
  removeBook: () => null,
  createBook: () => null,
};

const mapDisptachToProps = dispatch => ({
  removeBook: book => dispatch(removeBook(book)),
  createBook: book => dispatch(createBook(book)),
});

const mapStateToProps = ({ booksReducer: { books }, filter }) => ({
  books,
  filter,
});

export default connect(mapStateToProps, mapDisptachToProps)(BookList);
