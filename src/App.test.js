import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createNumberRange, checkRange} from './utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('range creation', ()=>{
  expect(createNumberRange(2014, 2016)).toEqual([2014,2015,2016]);
});

it('false range creation', ()=>{
  expect(createNumberRange(2014, 2016)).not.toEqual([2014,2015,2016,2017]);
});

it('check range correctness', ()=>{
  expect(checkRange(2014,2016)).toBe(null);
});

it('check range incorrectness', ()=>{
  expect(checkRange(2016,2014)).not.toBe(null);
});
