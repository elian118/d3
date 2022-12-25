import React, { useEffect, useRef, useState } from 'react';
import { axisLeft, line, scaleLinear, select } from 'd3';
import { dataSet1, dataSet2, dataSet3 } from '@/consts/dataSets/lineGraph';
import {
  margin,
  offsetX,
  offsetY,
  scale,
  svgHeight,
  svgWidth,
} from '@/consts/lineGraph';
import { DescView } from '@/pages/9-3.MultiLineGraph/DescView';

export const MultiLineGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataArr, setDataArr] = useState<number[][]>([]);

  let myLines = line<number>()
    .x((d, i) => offsetX + i * margin) // x좌표 = (표시 순서 * 간격)
    .y((d) => svgHeight - Number(d) * scale - offsetY); // 데이터로부터 Y 좌표 빼기, 범위 두 배로 확대

  let yScale = scaleLinear()
    .domain([0, 100])
    .range([scale * 100, 0]); // 범위(y축 높이) 두 배로 확대 => 꺾은선 추이가 그래프에 잘 드러나도록..

  svg
    .select('.axis') // 눈금자 요소를 배치할 위치 지정
    .call(axisLeft(yScale) as any); // 입력된 스케일로 y축 눈금자를 나타내는 DOM 요소들을 자동 생성

  useEffect(() => {
    setDataArr([dataSet1, dataSet2, dataSet3]);
    return () => setDataArr([]);
  }, [dataArr.length]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>다중 꺾은선 그래프</h1>
      <DescView />
      <svg ref={svgRef} className="w-[360px] h-[240px] border border-gray-200">
        <g className="axis" transform={`translate(${offsetX}, ${offsetY})`} />
        {dataArr.length > 0 &&
          dataArr[0].map((d, i) => (
            <rect
              key={i}
              className="axisX"
              width={svgWidth}
              height={1}
              transform={`translate(${offsetX}, ${svgHeight - offsetY - 0.5})`}
            />
          ))}
        {dataArr.length > 0 &&
          dataArr.map((data, idx) => (
            <path
              key={`item${idx + 1}`}
              className={`line item${idx + 1}`}
              d={myLines(data) ?? '0'}
            />
          ))}
      </svg>
    </div>
  );
};
