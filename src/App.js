import React from 'react';
import axios from 'axios';
import QueryForm from './QueryForm';
import ResultArea from './ResultArea';
import './App.css';

const API_KEY = 'XXX';

function createNumberRange(start, end){
  const s = parseInt(start),
  e = parseInt(end);
  return Array.from(new Array(e - s + 1), (x,i) => i+s);
}

function checkRange(start, end){
  if (end<start){
    return 'end date earlier than start date';
  } else if(end-start>10){
    return 'difference between start date and end date is greater than 10 years';
  }
  return null;
}

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
    console.log('HANDLING SUBMIT', this.state.query)
    const errorMsg = checkRange(this.state.start, this.state.end);
    if(errorMsg != null){
      console.log('error')
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
    console.log('calling', this.state)
    axios.all(this.createPromiseArray(term, parseInt(this.state.start), parseInt(this.state.end)))
    .then(res => {
      console.log('res', res)
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
