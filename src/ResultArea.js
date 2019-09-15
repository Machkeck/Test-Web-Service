import React from 'react';
import rd3 from 'react-d3-library'
import './ResultArea.css';

function ResultArea(props) {
  return (
    <div className="ResultArea">
      <h2>RESULTS</h2>
      <p>{props.query}</p>
    </div>
  );
}

export default ResultArea;
