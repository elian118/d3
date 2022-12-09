import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { select } from 'd3';
import { dataSet1, dataSet2 } from '@/consts/dataSets';

export const UdtData = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dataSet, setDataSet] = useState<number[]>(dataSet1);

  useEffect(() => {
    const svg = select(svgRef?.current);
    svg
      .selectAll('rect')
      .data(dataSet)
      .join(
        (enter) => enter.append('rect'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove(),
      )
      .attr('x', 0)
      .attr('y', (data, idx) => idx * 25)
      .attr('width', (data) => `${data}px`)
      .attr('height', '20px');
  }, [dataSet]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>데이터 업데이트</h1>
      <div className="text-base my-4 max-w-[500px]">
        D3는 리액트 훅과 연계한 동적 업데이트가 가능하다.
        <br />
        <br />
        데이터셋 바꾸기 버튼을 눌러 <br />
        데이터를 [20, 230, 150, 10, 20] 또는
        <br />
        [300, 130, 5, 60, 240]로 변경해보자
        <br />
      </div>
      <Button
        color="teal"
        className="my-4"
        ripple
        size="sm"
        onClick={() => {
          setDataSet(
            JSON.stringify(dataSet) === JSON.stringify(dataSet1)
              ? dataSet2
              : dataSet1,
          );
        }}
      >
        데이터셋 바꾸기
      </Button>
      <svg
        ref={svgRef}
        className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500 stroke-amber-200 hover:stroke-amber-700"
      />
    </div>
  );
};
