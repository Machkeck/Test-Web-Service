import React from 'react';
import axios from 'axios';
import QueryForm from './QueryForm';
import ResultArea from './ResultArea';
import {createNumberRange, checkRange} from './utils';
import './App.css';

const API_KEY = process.env.REACT_APP_NCBI_API_KEY || 'XX ';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: '', data: null, range:createNumberRange(2010, 2017), start: 2010, end: 2017, error:null};
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  handleQueryChange(query){
    this.setState({query:query})
  }

  handleStartChange(start){
    this.setState({start:start});
  }

  handleEndChange(end){
    this.setState({end:end});
  }

  handleQuerySubmit(query){
    const errorMsg = checkRange(this.state.start, this.state.end);
    if(errorMsg != null){
      this.setState({error: errorMsg});
    } else {
      this.callApi(this.state.query)
    }
  }

  createQueryPromise(term, year) {
    const query = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${term}+AND+${year}&datetype=pdat&retmax=100000&retmode=json&api_key=${API_KEY}`;
    return axios.get(query);
  }

  createPromiseArray(term, start, end) {
    let i = start;
    const promiseArray = [];
    while(i<=end){
      promiseArray.push(this.createQueryPromise(term, i))
      i+=1;
    }
    return promiseArray;
  }

  callApi(term){
    axios.all(this.createPromiseArray(term, parseInt(this.state.start), parseInt(this.state.end)))
    .then(res => {
      const results = res.map(response => response.data.esearchresult.idlist)
      this.setState({data: results, range:createNumberRange(this.state.start, this.state.end), error:null});
    })
    .catch(error => {
      console.log(error)
      this.setState({error: 'API Error'})
    })
  }

  render(){
    return (
      <div className="App">
        <div className="App-QueryArea">
          <QueryForm
          query={this.state.query}
          start={this.state.start}
          end={this.state.end}
          onQueryChange={this.handleQueryChange}
          onStartChange={this.handleStartChange}
          onEndChange={this.handleEndChange}
          onQuerySubmit={this.handleQuerySubmit}/>
        </div>
        <div className="App-ResultArea">
          <ResultArea
          data={this.state.data}
          range={this.state.range}
          error={this.state.error}/>
        </div>
      </div>
    );
  }
}

export default App;
