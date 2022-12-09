import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { PieArcDatum, scaleOrdinal, schemeCategory10, select } from 'd3';
import { svgWidth } from '@/consts/verticalBarGraph';
import { initDataSet2, svgHeight } from '@/consts/pieChart';
import { DescView } from '@/pages/8-2.PieColorChart/DescView';

export const PieColorChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  const pie = d3.pie(); // 원 그래프 좌표 계산 => 데이터 타입이 존재하면 랩퍼 지정도 가능하다.
  const arc = d3
    .arc<PieArcDatum<number | { valueOf(): number }>>()
    .innerRadius(10)
    .outerRadius(100); // 원 그래프 안쪽 반지름, 바깥 반지름 설정
  const d3Colors = scaleOrdinal<string>(schemeCategory10); // d3에서 제공하는 표준 10색(schemeCategory10) => 그 외 색상 세트는 schemeCategory10 -> ctrl + click 으로 확인 가능

  let pieElement = svg.selectAll('path').data(pie(dataSet));

  const updateData = () => {
    pieElement
      .join(
        (enter) => enter.append('path').attr('class', 'pie'),
        (update) => update.attr('class', 'pie'),
        (exit) => exit.remove(),
      )
      .attr('d', arc)
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`) // 원점을 원 그래프 중심으로 배치 => 반지름은 여길 기준으로 계산된다.
      // .style('fill', (d, i) => cstColors[i]);
      .style('fill', d3Colors as any); // 2번째 인자 타입 불일치 회피를 위해 any 간주
  };

  useEffect(() => {
    updateData();
  }, [dataSet]);

  useEffect(() => {
    setDataSet(initDataSet2);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>원 그래프 색 구분</h1>
      <DescView />
      <svg ref={svgRef} className="w-[300px] h-[300px]" />
    </div>
  );
};
