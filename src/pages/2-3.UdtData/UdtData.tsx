import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { select } from 'd3';
import { dataSet1, dataSet2 } from '../../consts/dataSets';

export const UdtData = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dataSet, setDataSet] = useState<number[]>(dataSet1);

  useEffect(() => {
    const svg = select(svgRef?.current);
    svg.selectAll('rect').data(dataSet)
      .join((enter) => enter.append('rect'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove()
      )
      .attr('x', 0)
      .attr('y', (data, idx) => idx * 25)
      .attr('width', (data) => `${data}px`)
      .attr('height', '20px');
  }, [dataSet]);

  return (
    <div>
      <h1>가로형 막대그래프</h1>
      <Button color="teal" ripple size="sm" onClick={() => {
        setDataSet(JSON.stringify(dataSet) === JSON.stringify(dataSet1) ? dataSet2 : dataSet1);
      }}>데이터 업데이트</Button>
      <svg ref={svgRef} className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500 stroke-amber-200 hover:stroke-amber-700" />
    </div>
  );
};