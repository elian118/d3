import React, { useEffect, useRef, useState } from 'react';
import { axisLeft, scaleLinear, select } from 'd3';
import './verticalBarGraphStyle.css';
import {
  barMargin,
  barWidth,
  dataMax,
  initDataSet,
  labels,
  offsetX,
  offsetY,
  svgHeight, svgWidth,
} from '@/consts/verticalBarGraph';

export const VerticalBarGraph = () => {
  let barElement; // 막대그래프 막대 요소를 저장할 변수

  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  // 눈금 표시를 위한 스케일 설정
  const yScale = scaleLinear().domain([0, dataMax]).range([dataMax, 0]); // y 좌표가 거꾸로 계산되므로 range 반대로 입력

  const applyRuler = () => {
    // 세로 눈금 설정
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(${offsetX}, ${svgHeight - 300 - offsetY})`)
      .call(
        axisLeft(yScale)
          // .ticks(5) // 한 줄 안에 몇 개의 눈금을 보여줄 것인지 표시 옵션(기본 10개)
          // .tickFormat(format('.1f')) // 소수점 자릿수 표시 옵션. f 앞 숫자가 커질수록 표시할 소수점 아래 자릿수도 커진다.
      );
    // 가로 눈금 설정 => 여기서는 레이블에 해당
    svg.append('rect')
      .attr('class', 'axisX')
      .attr('width', 320)
      .attr('height', 1)
      .attr('transform', `translate(${offsetX}, ${svgHeight - offsetY})`);
  }

  // 텍스트 입력
  const inputText = () => {
    // 그래프 안에 데이터(숫자) 표시
    barElement.enter()
      .append('text')
      .attr('class', 'barNum')
      .attr('x', (d, i) => i * 25 + 10 + offsetX)
      .attr('y', svgHeight - 5 - offsetY)
      .text((d) => d); // 데이터 표시
    // 막대 레이블 표시
    barElement.enter()
      .append('text')
      .attr('class', 'barName')
      .attr('x', (d, i) => i * (barWidth + barMargin) + 10 + offsetX)
      .attr('y', svgHeight - offsetY + 15)
      .text((d, i) => labels[i]);
  }

  // 데이터 추가
  const inputData = () => {
    barElement = svg.selectAll('rect').data(dataSet);

    barElement.enter() // 데이터 수만큼 반복
      .append('rect') // 데이터 수만큼 rect 요소 추가
      .attr('class', 'bar')
      .attr('height', 0) // 높이 초기값 지정(애니메이션 시작 전)
      .attr('width', barWidth)
      .attr('x', (d, i) => i * (barWidth + barMargin) + offsetX) // x좌표 지정 => 그래프 간격 설정 + 보정치 추가
      .attr('y', svgHeight - offsetY) // y좌표 초기값 지정(애니메이션 시작 전) => 그래프 가장 아래
      // 애니메이션 효과 추가
      .transition()
      .duration(500)
      .delay((d, i) => i * 50) // 인덱스마다 0.05초씩 순차 실행
      .attr('y', (d) => svgHeight - d - offsetY) // y좌표 지정 => 세로 그래프 보정치 부여(막대 그래프 시작점 보정) - 눈금자 중첩을 피하기 위한 보정치 추가
      .attr('height', (d) => d);

    inputText();
    applyRuler();
  }

  useEffect(() => {
    dataSet.length > 0 && inputData();
  }, [dataSet]);

  useEffect(() => {
    setDataSet(initDataSet);
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
      <svg ref={svgRef} className={`w-[${svgWidth}px] h-[${svgHeight + 10}px] my-4`} />
    </div>
  );
};