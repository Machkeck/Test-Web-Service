import React from 'react';
import BarChart from './BarChart';
import './ResultArea.css';

function ResultArea(props) {
  const error = props.error;
  const errorStyle = {
    color:'red'
  };
  return (
    <div className="ResultArea">
      <h2>RESULTS</h2>
      {error != null ? (<h3 style={errorStyle}>ERROR: {error}</h3>) : (<BarChart data={props.data} range={props.range}/>)}
      
    </div>
  );
}

export default ResultArea;
