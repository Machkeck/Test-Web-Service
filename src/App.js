import React from 'react';
import axios from 'axios';
import QueryForm from './QueryForm';
import ResultArea from './ResultArea';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: '', data: null, start: 2010, end: 2019};
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  handleQueryChange(query){
    this.setState({query:query})
  }

  handleQuerySubmit(query){
    console.log('HANDLING SUBMIT', this.state.query)
    this.callApi(this.state.query)
  }

  callApi(term){
    const fullQuery = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}+AND+2011&datetype=pdat&retmax=100000&retmode=json`;
    axios.get(fullQuery)
    .then(res => {
      console.log('api', res);
      this.setState({data:res.data.esearchresult.idlist});
    })
  }

  render(){
    return (
      <div className="App">
        <div className="App-QueryArea">
          <QueryForm
          query={this.state.query}
          onQueryChange={this.handleQueryChange}
          onQuerySubmit={this.handleQuerySubmit}/>
        </div>
        <div className="App-ResultArea">
          <ResultArea
          data={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
