import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { dataSet1 } from '@/consts/dataSets';

export const BarGraph = () => {
  const [dataSet, setDataSet] = useState<number[]>([]);

  d3.select('#myGraph')
    .selectAll('rect')
    .data(dataSet)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', (data, idx) => idx * 25)
    .attr('width', (data) => `${data}px`)
    .attr('height', '20px');

  useEffect(() => {
    setDataSet(dataSet1);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>가로형 막대그래프</h1>
      <div className="text-base my-4 max-w-[500px]">
        [300, 130, 5, 60, 240] 데이터를
        <br />
        rect의 너비값으로 각각 지정하면 아래와 같이 표현된다.
      </div>
      <svg
        id="myGraph"
        className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500 stroke-amber-200 hover:stroke-amber-700"
      />
    </div>
  );
};
