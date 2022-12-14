import React, { useEffect, useRef, useState } from 'react';
import { axisLeft, scaleLinear, select } from 'd3';
import '../../styles/barGraph/verticalBarGraphStyle.css';
import {
  barMargin,
  barWidth,
  dataMax,
  offsetX,
  offsetY,
  svgHeight,
  svgWidth,
} from '@/consts/verticalBarGraph';
// @ts-ignore
import myData from '@/consts/csv/verticalMyData.csv';
import { Button } from '@material-tailwind/react';
import { DescView } from '@/pages/7-1.VerticalBarGraph/DescView';

export const VerticalBarGraph = () => {
  let barElement; // 막대그래프 막대 요소를 저장할 변수

  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  // 눈금 표시를 위한 스케일 설정
  const yScale = scaleLinear().domain([0, dataMax]).range([dataMax, 0]); // y 좌표가 거꾸로 계산되므로 range 반대로 입력

  const applyRuler = () => {
    let isThereYRuler = svg.selectAll('g')['_groups'][0].length > 0;
    // 세로 눈금 설정
    !isThereYRuler && // 데이터 업뎃 때마다 기존 세로 눈금자에 새로 생성된 세로 눈금자가 덮어쓰기 되는 현상 방지
      svg
        .append('g')
        .attr('class', 'axis')
        .attr(
          'transform',
          `translate(${offsetX}, ${svgHeight - 300 - offsetY})`,
        )
        .call(
          axisLeft(yScale),
          // .ticks(5) // 한 줄 안에 몇 개의 눈금을 보여줄 것인지 표시 옵션(기본 10개)
          // .tickFormat(format('.1f')) // 소수점 자릿수 표시 옵션. f 앞 숫자가 커질수록 표시할 소수점 아래 자릿수도 커진다.
        );
    // 가로 눈금 설정 => 여기서는 레이블에 해당
    svg
      .append('rect')
      .attr('class', 'axisX')
      .attr('width', 320)
      .attr('height', 1)
      .attr('transform', `translate(${offsetX}, ${svgHeight - offsetY})`);
  };

  // 막대 레이블 표시
  const inputLabel = () => {
    barElement
      .enter()
      .append('text')
      .attr('class', 'barName')
      .attr('x', (d, i) => i * (barWidth + barMargin) + 10 + offsetX)
      .attr('y', svgHeight - offsetY + 15)
      .text((d, i) => myData.map((data) => Object.keys(data))[0][i]);
  };

  // 그래프 속 데이터(숫자) 업데이트
  const updateText = () => {
    let barNums = svg.selectAll('.barNum').data(dataSet);

    barNums
      .join(
        (enter) => enter.append('text').attr('class', 'barNum'),
        (update) => update.attr('class', 'barNum'),
        (exit) => exit.remove(),
      )
      .style('opacity', 0)
      // 애니메이션 효과 추가
      .transition()
      .duration(500)
      .delay((d, i) => i * 50) // 인덱스마다 0.05초씩 순차 실행
      .style('opacity', 1)
      .attr('x', (d, i) => i * 25 + 10 + offsetX)
      .attr('y', svgHeight - 5 - offsetY)
      .text((d) => d); // 데이터 표시
  };

  // 그래프 데이터 업데이트
  const updateData = () => {
    barElement = svg.selectAll('rect').data(dataSet);

    barElement
      .join(
        (enter) => enter.append('rect').attr('class', 'bar'),
        (update) => update.attr('class', 'bar'),
        (exit) => exit.remove(),
      )
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

    inputLabel();
    applyRuler();
  };

  const importData = () => {
    !!myData &&
      setDataSet(
        myData.map((data) => {
          const items = Object.keys(data);
          const selectItem = items[Math.floor(Math.random() * 10)];
          return Number(data[selectItem]);
        }),
      );
  };

  // 데이터 업데이트 감지 시 랜더 실행
  useEffect(() => {
    // 데이터 업데이트를 그래프와 텍스트 두 번에 걸쳐 진행하는 이유는
    // 업데이트를 처리하는 D3 join() 메서드가 한 번에 하나의 선택자들만 일괄 처리할 수 있기 때문
    dataSet.length > 0 && updateData();
    dataSet.length > 0 && updateText();
  }, [dataSet]);

  useEffect(() => {
    importData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>세로형 막대그래프</h1>
      <DescView />
      <Button
        color="teal"
        ripple
        size="sm"
        className="mt-4"
        onClick={() => {
          importData();
        }}
      >
        CSV 데이터 셋 교체
      </Button>
      <svg ref={svgRef} className={`w-[${svgWidth}px] h-[250px] my-4`} />
    </div>
  );
};
