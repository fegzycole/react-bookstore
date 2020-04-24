import React, { Component } from 'react';
import categories from '../utils/bookCategories';
import db from '../firebase/config';

class BooksForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      category: '',
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  reset() {
    this.setState({
      title: '',
      category: '',
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      error: null,
    });

    const { title, category } = this.state;

    try {
      await db.collection('bookstore').add({
        title,
        category,
      });
      this.reset();
    } catch (error) {
      this.setState({
        error: error.message,
      });
      throw new Error(error.message);
    }
  }

  render() {
    const { category, title, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h4>ADD NEW BOOK</h4>
        <div className="form-group">
          <input
            type="text"
            placeholder="Book Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            className="input-text"
          />
          <select
            name="category"
            onChange={this.handleChange}
            className="select-category"
            value={category}
          >
            <option disabled>
              Please Select Category
            </option>
            {categories.map(category => (
              <option value={category} key={Math.random() * 5}>
                {category}
              </option>
            ))}
          </select>
          <input type="submit" value="add book" className="submit-btn" />
        </div>
        <p className="error">{error}</p>
      </form>
    );
  }
}

export default BooksForm;
