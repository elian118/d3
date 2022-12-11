import React, { useEffect, useRef, useState } from 'react';
import { interpolate, PieArcDatum, select, sum } from 'd3';
import * as d3 from 'd3';
import {
  cstColors,
  initDataSet,
  initDataSet2,
  svgHeight,
  svgWidth,
} from '@/consts/pieChart';
import { DescView } from './DescView';
import { Button } from '@material-tailwind/react';

export const TextPieChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  let pie = d3.pie<number>().value((d) => d)(dataSet); // 계산을 위한 데이터를 d3에 전달
  let arc = d3.arc<PieArcDatum<number>>().innerRadius(30).outerRadius(100);
  let pieElement;
  let textElement;

  const updateText = () => {
    textElement = svg.selectAll('text').data(pie);
    textElement
      .style('opacity', 0)
      .transition()
      .duration(dataSet.length * (1500 / (dataSet.length * 2)))
      .delay((d, i) => i * (1500 / (dataSet.length * 2)))
      .style('opacity', 1);
  };

  const updateData = () => {
    pieElement = svg.selectAll('path').data(pie);
    pieElement
      .style('opacity', 0)
      .transition()
      .duration(dataSet.length * (1000 / (dataSet.length * 2)))
      .delay((d, i) => i * (1000 / (dataSet.length * 2)))
      .style('opacity', 1)
      .attrTween('d', (d) => {
        const interpol = interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          { startAngle: d.startAngle, endAngle: d.endAngle },
        );
        // @ts-ignore
        return (t) => arc(interpol(t));
      });
  };

  useEffect(() => {
    updateData();
    updateText();
  }, [dataSet]);

  useEffect(() => {
    setDataSet(initDataSet);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>리액트 텍스트 원 그래프</h1>
      <DescView />
      <Button
        className="mt-4"
        color="teal"
        ripple
        variant="filled"
        size="sm"
        onClick={() => {
          setDataSet([]);
          setDataSet(
            JSON.stringify(dataSet) === JSON.stringify(initDataSet)
              ? initDataSet2
              : initDataSet,
          );
        }}
      >
        데이터 교체
      </Button>
      <svg ref={svgRef} className="w-[300px] h-[220px]">
        <text
          className="total"
          transform={`translate(${svgWidth / 2}, ${svgHeight / 2 + 5})`}
        >{`합계: ${sum(dataSet)}`}</text>
        {dataSet.length > 0 &&
          pie.map((data, idx) => (
            <g
              key={idx}
              transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}
            >
              <path
                className="pie"
                d={arc(data) ?? undefined}
                style={{ fill: cstColors[idx] }}
              />
              <text
                className="pieNum"
                transform={`translate(${arc.centroid(data)})`}
              >
                {data.value}
              </text>
            </g>
          ))}
      </svg>
    </div>
  );
};
