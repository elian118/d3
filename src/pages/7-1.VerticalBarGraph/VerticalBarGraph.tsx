import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';
import { dataSet2 } from '@/consts/dataSets';
import './verticalBarGraphStyle.css';

export const VerticalBarGraph = () => {
  const svgHeight = 240;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);
  let barElement;

  const [dataSet, setDataSet] = useState<number[]>([]);

  const inputText = () => {
    barElement.enter()
      .append('text')
      .attr('class', 'barNum')
      .attr('x', (d, i) => i * 25 + 10)
      .attr('y', svgHeight - 5)
      .text((d) => d); // 데이터 표시
  }

  const init = () => {
    barElement = svg.selectAll('rect').data(dataSet);

    barElement.enter() // 데이터 수만큼 반복
      .append('rect') // 데이터 수만큼 rect 요소 추가
      .attr('class', 'bar')
      .attr('height', (d) => d)
      .attr('width', 20)
      .attr('x', (d, i) => i * 25) // x좌표 지정 => 그래프 간격 설정
      .attr('y', (d) => svgHeight - d) // y좌표 지정 => 세로 그래프 보정치 부여(막대 그래프 시작점 보정)

    inputText();
  }

  useEffect(() => {
    dataSet.length > 0 && init();
  }, [dataSet]);

  useEffect(() => {
    setDataSet(dataSet2);
  }, []);

  return (
    <div>
      <h1>세로형 막대그래프</h1>
      <div className="text-base my-4 max-w-[500px]">
        세로형 막대그래프 코드도 가로형과 거의 유사하다.<br/>
        단, 세로형은 y좌표 원점이 맨 위에서 시작하며,<br/>
        아래로 갈 수록 숫자가 커지는 구조다.<br/><br/>
        즉, 코드로 입력하는 y좌표 값을 절대값으로 간주해야 한다.
      </div>
      <svg ref={svgRef} className="w-full h-[240px] my-4" />
    </div>
  );
};