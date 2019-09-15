import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {

    componentDidMount() {
        // const data = [ 2, 4, 2, 6, 8 ];
        const data = this.props.data != null ? [this.props.data.length] : [200];
        console.log('data', data)
        this.drawBarChart(data)
    }
    
    componentDidUpdate(prevProps) {
        console.log('>>', this.props)
        const data = this.props.data != null ? [this.props.data.length] : [200];
        this.drawBarChart(data)
     }

    drawBarChart(data) {
        console.log('drawing')
        d3.select('.canvas > *').remove()
        const canvasHeight = 400,
            canvasWidth = 600,
            scale = 1;
        const svgCanvas = d3.select('.canvas')
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .style("border", "1px solid black")

        svgCanvas.selectAll("rect")
        .data(data).enter()
        .append("rect")
        .attr("width", 40)
        .attr("height", (datapoint) => datapoint * scale)
        .attr("fill", "orange")
        .attr("x", (datapoint, iteration) => iteration * 45)
        .attr("y", (datapoint) => canvasHeight - datapoint * scale)

    }

    render() { 
        return <div className="canvas"></div> 
    }
}

export default BarChart;
