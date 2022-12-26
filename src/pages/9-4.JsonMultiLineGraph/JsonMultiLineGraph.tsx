import React, { useEffect, useRef, useState } from 'react';
import { SelectBoxView } from '@/pages/9-3.MultiLineGraph';
import { axisBottom, axisLeft, curveBasis, scaleLinear, select } from 'd3';
import { CurveFactory } from 'd3-shape';
import {
  offsetX,
  offsetY,
  scale,
  svgHeight,
  svgWidth,
} from '@/consts/lineGraph';
import { jsonDataSet } from '@/consts/dataSets/lineGraph';
import { JsonData } from '@/types/lineChart';
import { DrawGraph } from './DrawGraph';
import { DescView } from './DescView';
import '../../styles/lineGraph/lineGraphStyle.css';

export const JsonMultiLineGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataArr, setDataArr] = useState<JsonData[][]>([]);
  const [curve, setCurve] = useState<CurveFactory[]>([curveBasis]);

  let xScale = scaleLinear().domain([2004, 2013]).range([0, svgWidth]);

  let yScale = scaleLinear()
    .domain([0, 100])
    .range([scale * 100, 0]);

  svg.select('.axisX').call(
    axisBottom(xScale)
      .ticks(5) // 눈금 5개만 표시
      .tickFormat((d) => `${d}년`) as any, // 연도 포맷 적용
  );
  svg.select('.axisY').call(axisLeft(yScale) as any);

  const dataMapping = () => {
    let tempDataArr: JsonData[][] = [];
    let tempData: JsonData[] = [];
    const keys = Object.keys(jsonDataSet[0]).filter((e) => e.includes('item'));

    keys.forEach((x) => {
      tempData = [];
      tempData = jsonDataSet.map((e) => ({ year: e.year, value: e[x] }));
      tempDataArr.push(tempData);
    });
    setDataArr(tempDataArr);
  };

  useEffect(() => {
    dataMapping();
    setCurve([curveBasis]);
    return () => setDataArr([]);
  }, [dataArr.length]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>다중 꺾은선 그래프 - JSON</h1>
      <DescView />
      <SelectBoxView setCurve={setCurve} />
      <svg
        ref={svgRef}
        className="w-[360px] h-[250px] border border-gray-200 overflow-visible" // overflow-visible: 넘치는 텍스트 그대로 표시
      >
        {/* x축 눈금자 */}
        <g
          className="axisX"
          transform={`translate(${offsetX}, ${svgHeight - offsetY})`}
        />
        {/* y축 눈금자 */}
        <g className="axisY" transform={`translate(${offsetX}, ${offsetY})`} />
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
