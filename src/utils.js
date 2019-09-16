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

  export {createNumberRange, checkRange}