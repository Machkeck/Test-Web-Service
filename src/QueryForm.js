import React from 'react';
import './QueryForm.css';

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onQueryChange(event.target.value)
  }

  handleStartChange(event){
    this.props.onStartChange(event.target.value)
  }

  handleEndChange(event){
    this.props.onEndChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onQuerySubmit(event.target.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Disease:
          <input type="text" value={this.props.query} onChange={this.handleChange} />
        </label>
        <label>
          Start Year:
        <input name="startYear" type="number" value={this.props.start} onChange={this.handleStartChange}/>
        </label>
        <label>
          End Year:
          <input name="endYear" type="number" value={this.props.end} onChange={this.handleEndChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default QueryForm;
