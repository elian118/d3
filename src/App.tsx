import './App.css';
import * as d3 from 'd3';
import { dataSet } from './consts/dataSet';

const App = () => {
  d3.select('#myGraph')
    .selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (data, idx) => idx * 25)
    .attr('width', (data) => `${data}px`)
    .attr('height', '20px');

  return (
    <div className="App">
      <h1>가로형 막대그래프</h1>
      <svg id="myGraph" />
    </div>
  )
}

export default App
