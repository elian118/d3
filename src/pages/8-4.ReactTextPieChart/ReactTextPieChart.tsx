import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { interpolate, PieArcDatum, select } from 'd3';
import {
  cstColors,
  initDataSet,
  initDataSet2,
  svgHeight,
  svgWidth,
} from '@/consts/pieChart';
import { DescView } from './DescView';
import { Button } from '@material-tailwind/react';
import '../../styles/pieChart/pieChartStyle.css';

export const ReactTextPieChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  let pie = d3.pie<number>().value((d) => d)(dataSet); // 계산을 위한 데이터를 d3에 전달
  let arc = d3.arc<PieArcDatum<number>>().innerRadius(10).outerRadius(100);
  let pieElement; // 랜더 때마다 초기화해야 애니메이션이 정확하게 동작

  const updateData = () => {
    pieElement = svg.selectAll('path').data(pie);
    // 복잡한 애니메이션 계산은 D3에 맡긴다.
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
  }, [dataSet]);

  useEffect(() => {
    setDataSet(initDataSet);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>리액트 원 그래프 애니메이션</h1>
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
        {/* DOM 관련은 모두 리액트에 맡긴다.
          아래 예제는 dataSet 없뎃마다 D3가 다시 계산한 pie 배열을
          맵으로 순회하며 path 요소를 추가함으로써 화면을 다시 그리게 된다.  */}
        {dataSet.length > 0 &&
          pie.map((data, idx) => (
            <path
              key={idx}
              className="pie"
              d={arc(data) ?? undefined}
              transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}
              style={{ fill: cstColors[idx] }}
            />
          ))}
      </svg>
    </div>
  );
};
