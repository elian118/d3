import React, { useEffect, useRef, useState } from 'react';
import '../../styles/lineGraph/lineGraphStyle.css';
import { axisLeft, line, scaleLinear, select } from 'd3';
import {
  dataSet,
  margin,
  offsetX,
  offsetY,
  scale,
  svgHeight,
  svgWidth,
} from '@/consts/lineGraph';
import { DescView } from '@/pages/9-2.TextLineGraph';

export const TextLineGraph = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [data, setData] = useState<number[]>([]);

  let myLines = line<number>()
    .x((d, i) => offsetX + i * margin) // x좌표 = (표시 순서 * 간격)
    .y((d) => svgHeight - Number(d) * scale - offsetY); // 데이터로부터 Y 좌표 빼기

  let yScale = scaleLinear()
    .domain([0, 100])
    .range([scale * 100, 0]);

  svg
    .select('.axis') // 눈금자 요소를 배치할 위치 지정
    .call(axisLeft(yScale) as any); // 입력된 스케일로 y축 눈금자를 나타내는 DOM 요소들을 자동 생성

  // 리액트 방식으로 D3 차트를 그리려면,
  // 꼭, data 변경을 감지해 리랜더링될 수 있도록 생애주기 이펙트를 부여해야 한다.
  // 이러한 컴포넌트 생애주기 설정이 D3.join() 메서드와 같은 역할을 하기 때문이다.
  useEffect(() => {
    setData(dataSet);
    return () => setData([]); // 함수형 컴포넌트 사망(종료) 시 state 초기화 설정
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>텍스트 꺾은선 그래프</h1>
      <DescView />
      <svg ref={svgRef} className="w-[360px] h-[240px] border border-gray-200">
        <g className="axis" transform={`translate(${offsetX}, ${offsetY})`} />
        {dataSet.map((d, i) => (
          <rect
            key={i}
            className="axisX"
            width={svgWidth}
            height={1}
            transform={`translate(${offsetX}, ${svgHeight - offsetY - 0.5})`}
          />
        ))}
        <path className="line" d={myLines(dataSet) ?? '0'} />
      </svg>
    </div>
  );
};
