import React from 'react';
import './QueryForm.css';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onQueryChange(event.target.value)
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    this.props.onQuerySubmit(event.target.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.props.query} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QueryForm;
