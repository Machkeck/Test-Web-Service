import React from 'react';
import BarChart from './BarChart';
import './ResultArea.css';

function ResultArea(props) {
  return (
    <div className="ResultArea">
      <h2>RESULTS</h2>
      <BarChart data={props.data}/>
    </div>
  );
}

export default ResultArea;
