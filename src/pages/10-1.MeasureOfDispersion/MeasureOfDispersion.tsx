import React, { useEffect, useRef, useState } from 'react';
import { dataSet } from '@/consts/measureOfDispersion/dataSet';
import { svgHeight } from '@/consts/lineGraph';

export const MeasureOfDispersion = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    setData(dataSet);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>산포도 - 개요</h1>
      <div className="my-4">
        산포도는 여러 개 원(circle)요소를 흩뿌리는 방식인데,
        <br />각 원의 중심좌표와 기본 반지름만 지정해주면 산포도가 그려진다.
        <br />
        <br />
        따라서, 산포도 그래프를 그리려면 먼저 표시할 데이터를
        <br />각 원의 중심좌표 배열인 [x: number, y: number][ ] 타입으로
        가공해야 한다.
      </div>
      <svg
        ref={svgRef}
        className="w-[360px] h-[250px] border border-gray-200 overflow-visible"
      >
        {data.map((d, i) => (
          <circle
            key={i}
            className="mark"
            cx={d[0]}
            cy={svgHeight - d[1]}
            r="5"
          />
        ))}
      </svg>
    </div>
  );
};
