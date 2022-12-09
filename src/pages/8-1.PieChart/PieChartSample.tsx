import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../../styles/pieChart/pieChartStyle.css';
import { svgWidth } from '@/consts/verticalBarGraph';
import { PieArcDatum, select } from 'd3';
import { initDataSet, svgHeight } from '@/consts/pieChart';
import { DescView } from '@/pages/8-1.PieChart/DescView';

export const PieChartSample = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  const pie = d3.pie(); // 원 그래프 좌표 계산 => 데이터 타입이 존재하면 랩퍼 지정도 가능하다.
  const arc = d3.arc<PieArcDatum<any>>().innerRadius(10).outerRadius(100); // 원 그래프 안쪽 반지름, 바깥 반지름 설정 =>
  let pieElement = svg.selectAll('path').data(pie(dataSet));

  const updateData = () => {
    pieElement
      .join(
        (enter) => enter.append('path').attr('class', 'pie'),
        (update) => update.attr('class', 'pie'),
        (exit) => exit.remove(),
      )
      .attr('d', arc)
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`); // 원점을 원 그래프 중심으로 배치 => 반지름은 여길 기준으로 계산된다.
  };

  useEffect(() => {
    updateData();
  }, [dataSet]);

  useEffect(() => {
    setDataSet(initDataSet);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>원 그래프 개요</h1>
      <DescView />
      <svg ref={svgRef} className="w-[300px] h-[300px]" />
    </div>
  );
};
