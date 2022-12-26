import React, { useEffect, useRef, useState } from 'react';
import { axisLeft, curveBasis, scaleLinear, select } from 'd3';
import { dataSet1, dataSet2, dataSet3 } from '@/consts/dataSets/lineGraph';
import {
  offsetX,
  offsetY,
  scale,
  svgHeight,
  svgWidth,
} from '@/consts/lineGraph';
import { DescView } from '@/pages/9-3.MultiLineGraph/DescView';
import { DrawGraph } from '@/pages/9-3.MultiLineGraph/DrawGraph';
import { CurveFactory } from 'd3-shape';
import { SelectBoxView } from './SelectBoxView';

export const MultiLineGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataArr, setDataArr] = useState<number[][]>([]);
  const [curve, setCurve] = useState<CurveFactory[]>([curveBasis]);

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([scale * 100, 0]); // 범위(y축 높이) 두 배로 확대 => 꺾은선 추이가 그래프에 잘 드러나도록..

  svg
    .select('.axis') // 눈금자 요소를 배치할 위치 지정
    .call(axisLeft(yScale) as any); // 입력된 스케일로 y축 눈금자를 나타내는 DOM 요소들을 자동 생성

  useEffect(() => {
    setDataArr([dataSet1, dataSet2, dataSet3]);
    setCurve([curveBasis]);
    return () => setDataArr([]);
  }, [dataArr.length]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>다중 꺾은선 그래프</h1>
      <DescView />
      <SelectBoxView setCurve={setCurve} />
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
            <DrawGraph
              key={`item-${idx + 1}`}
              data={data}
              idx={idx}
              curve={curve}
            />
          ))}
      </svg>
    </div>
  );
};
