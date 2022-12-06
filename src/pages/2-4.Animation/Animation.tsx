import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { dataSet1 } from '../../consts/dataSets';
import { select } from 'd3';

export const Animation = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dataSet, setDataSet] = useState<number[]>(dataSet1);

  useEffect(() => {
    const svg = select(svgRef?.current);
    svg.selectAll('rect').data(dataSet)
      .join((enter) => enter.append('rect'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove()
      )
      .transition() // 애니메이션 효과 추가
      .attr('x', 0)
      .attr('y', (data, idx) => idx * 25)
      .attr('width', (data) => `${data}px`)
      .attr('height', '20px');
  }, [dataSet]);

  return (
    <div>
      <h1>가로형 막대그래프</h1>
      <Button color="teal" ripple size="sm" onClick={() => {
        let newData: number[] = [...dataSet];
        newData.forEach((d, idx) => newData[idx] = Math.floor(Math.random() * 320)); // 320 미만 값 랜덤 생성
        setDataSet(newData);
      }}>데이터 업데이트</Button>
      <svg ref={svgRef} className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500 stroke-amber-200 hover:stroke-amber-700" />
    </div>
  );
};