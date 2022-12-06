import React from 'react';
import * as d3 from 'd3';
import { dataSet } from './dataSet';

export const BarGraph = () => {
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
    <div>
      <h1>가로형 막대그래프</h1>
      <svg id="myGraph" className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500 stroke-amber-200 hover:stroke-amber-700" />
    </div>
  );
};