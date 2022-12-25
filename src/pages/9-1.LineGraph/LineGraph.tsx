import React, { useRef } from 'react';
import { line } from 'd3';
import { dataSet, margin, svgHeight } from '@/consts/lineGraph';
import '../../styles/lineGraph/lineGraphStyle.css';
import { DescView } from '@/pages/9-1.LineGraph/DescView';

export const LineGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const myLines = line<number>()
    .x((d, i) => i * margin) // x좌표 = (표시 순서 * 간격)
    .y((d) => svgHeight - Number(d)); // 데이터로부터 Y 좌표 빼기

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>꺾은선 그래프 - 개요</h1>
      <DescView />
      <svg ref={svgRef} className="w-[360px] h-[360px] border border-gray-200">
        {dataSet.map((d, i) => (
          <path key={i} className="line" d={myLines(dataSet) ?? '0'} />
        ))}
      </svg>
    </div>
  );
};
