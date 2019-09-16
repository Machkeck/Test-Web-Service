import React from 'react';
import * as d3 from 'd3';

function prepareData(data){
    return data != null ? data.map(year => year.length) : [];
}

class BarChart extends React.Component {

    componentDidMount() {
        // const data = [ 2, 4, 2, 6, 8 ];
        const data = prepareData(this.props.data);
        this.drawBarChart(data, this.props.range)
    }
    
    componentDidUpdate(prevProps) {
        const data = prepareData(this.props.data);
        this.drawBarChart(data, this.props.range)
     }

    drawBarChart(data, range) {
        d3.select('.canvas > *').remove()
        const margin = {top: 20, right: 20, bottom: 50, left: 70},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        scale = 0.05;
            
        var x = d3.scaleBand().domain(range).range([0, width]).padding([0.5]);
        var y = d3.scaleLinear().range([height, 0]);

        const svgCanvas = d3.select('.canvas')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("border", "1px solid black")

        svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("rect")
        .attr("width", x.bandwidth())
        .attr("height", (datapoint) => datapoint * scale)
        .attr("fill", "orange")
        .attr("x", (datapoint, iteration) => x(range[iteration]))
        .attr("y", (datapoint) => height - datapoint * scale)

        y.domain([0, d3.max(data, function(d) { return d; })]);

        svgCanvas.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(range.length));

        svgCanvas.append("text")             
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Year");

        svgCanvas.append("g")
        .call(d3.axisLeft(y));

        svgCanvas.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Publications");    

    }

    render() { 
        return <div className="canvas"></div> 
    }
}

export default BarChart;
