import React, { useEffect, useRef, useState } from 'react';
import { select, scaleLinear, axisBottom } from 'd3';
// @ts-ignore
import myData from '../../consts/csv/myData.csv';
import { Colors } from '@/consts/Colors';
import { Button } from '@material-tailwind/react';
import { DescView } from '@/pages/2-7.Ruler/DescView';

export const Ruler = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

  const xScale = scaleLinear().domain([0, 450]).range([0, 450]);

  const importData = () => {
    // d3.csv 메소드는 vite 환경에서 완벽하게 돌아가지 않는다.
    // @rollup/plugin-dsv => dsv 활용 => csv 파일 import => 단, 첫 인덱스 키가 문자열로 파싱되는 오류 있음
    !!myData &&
      setDataSet(
        myData.map((data) => {
          const items = Object.keys(data);
          const selectItem = items[Math.floor(Math.random() * 10)];
          return Number(data[selectItem]);
        }),
      );
  };

  // 눈금자 적용
  const applyRuler = () => {
    svg
      .append('g') // 차트 위치에 g 태그 삽입(눈금자와 관련된 모든 요소를 g 태그 안에 삽입)
      .attr('class', 'axis') // g 태그 class 속성 값을 axis 로 지정
      .attr('transform', `translate(10, ${(1 + dataSet.length) * 20 + 5})`) // .attr('transform', `translate(${xMargin}, ${yMargin})`) => 눈금자 위치 지정
      .call(axisBottom(xScale));
  };

  // 데이터 업데이트
  const updateData = () => {
    svg
      .selectAll('rect')
      .data(dataSet)
      .join(
        (enter) => enter.append('rect'),
        (update) => update.attr('class', 'updated'),
        (exit) => exit.remove(),
      )
      .transition() // 애니메이션 효과 추가
      .delay((d, idx) => idx * 100) // 딜레이 효과 => 첫 행부터 0.1초 간격으로 순차 실행
      .attr('id', (data, idx) => idx) // 인덱스 특정을 위해 id 속성에 idx 입력
      .attr('x', 10) // 왼쪽 여백 10
      .attr('y', (data, idx) => idx * 25)
      .attr('width', (data) => `${data}px`)
      .attr('height', '20px')
      .style('fill', Colors.Amber300)
      .style('stroke', Colors.Amber200);
    applyRuler(); // 눈금자 적용
  };

  const handleClickRect = (idx: number) => {
    svg.selectAll('rect').each(function (data, jdx) {
      jdx === idx
        ? select(this)
            .style('fill', Colors.Cyan200)
            .style('stroke', Colors.Gray300)
        : select(this).style('fill', Colors.Amber300);
    });
  };

  useEffect(() => {
    dataSet.length <= 0
      ? importData()
      : svg.on('click', (e) => handleClickRect(Number(e.target.id))); // id 속성에 입력된 idx 값을 그대로 전달
    dataSet.length > 0 && updateData();
  }, [dataSet]);

  useEffect(() => {
    importData();
  }, []);

  return (
    <div>
      <h1>눈금자 막대그래프</h1>
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
      <svg ref={svgRef} className="w-[470px] h-[160px] my-4 fill-amber-300" />
    </div>
  );
};
