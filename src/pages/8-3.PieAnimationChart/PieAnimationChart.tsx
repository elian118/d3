import React, { useEffect, useRef, useState } from 'react';
import {
  interpolate,
  PieArcDatum,
  scaleOrdinal,
  schemeCategory10,
  select,
} from 'd3';
import { initDataSet, initDataSet2, svgHeight } from '@/consts/pieChart';
import { svgWidth } from '@/consts/verticalBarGraph';
import { DescView } from './DescView';
import * as d3 from 'd3';
import { Button } from '@material-tailwind/react';

export const PieAnimationChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  const pie = d3.pie<number>().value((d) => d)(dataSet);
  const arc = d3.arc<PieArcDatum<number>>().innerRadius(10).outerRadius(100);
  const d3Colors = scaleOrdinal().range(schemeCategory10);

  let pieElement = svg.selectAll('path').data(pie);

  const updateData = () => {
    pieElement
      .join(
        (enter) => enter.append('path').attr('class', 'pie'),
        (update) => update.attr('class', 'pie'),
        (exit) => exit.remove(),
      )
      .attr('d', arc)
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2})`)
      .style('fill', d3Colors as any)
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
      <h1>원 그래프 애니메이션</h1>
      <DescView />
      <Button
        className="mt-4"
        color="teal"
        ripple
        variant="filled"
        size="sm"
        onClick={() => {
          setDataSet(
            JSON.stringify(dataSet) === JSON.stringify(initDataSet)
              ? initDataSet2
              : initDataSet,
          );
        }}
      >
        데이터 교체
      </Button>
      <svg ref={svgRef} className="w-[300px] h-[300px]" />
    </div>
  );
};
