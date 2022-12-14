import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { dataSet1 } from '@/consts/dataSets/lineGraph';
import * as d3 from 'd3';
import { Colors } from '@/consts/Colors';

export const Animation = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const svg = d3.select(svgRef?.current);

  const [dataSet, setDataSet] = useState<number[]>([]);

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
      .attr('x', 0)
      .attr('y', (data, idx) => idx * 25)
      .attr('width', (data) => `${data}px`)
      .attr('height', '20px')
      .style('fill', Colors.Amber300)
      .style('stroke', Colors.Amber200);
  };

  const handleClickRect = (idx: number) => {
    svg.selectAll('rect').each(function (data, jdx) {
      jdx === idx
        ? d3
            .select(this)
            .style('fill', Colors.Cyan200)
            .style('stroke', Colors.Gray300)
        : d3.select(this).style('fill', Colors.Amber300);
    });
  };

  useEffect(() => {
    svg.on('click', (e) => handleClickRect(Number(e.target.id))); // id 속성에 입력된 idx 값을 그대로 전달
  }, [dataSet]);

  useEffect(() => {
    setDataSet(dataSet1);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>애니메이션</h1>
      <div className="text-base my-4 max-w-[500px]">
        D3의 transition()과 delay() 메서드를 사용하면
        <br />
        애니메이션 효과도 부여할 수 있다.
        <br />
        버튼을 눌러 효과를 확인해보자.
      </div>
      <Button
        color="teal"
        className="my-2"
        ripple
        size="sm"
        onClick={() => {
          let newData: number[] = [...dataSet];
          newData.forEach(
            (d, idx) => (newData[idx] = Math.floor(Math.random() * 400)),
          ); // 400 미만 값 랜덤 생성
          setDataSet(newData);
          updateData();
        }}
      >
        랜덤 데이터 업데이트
      </Button>
      <svg
        ref={svgRef}
        className="border w-[420px] h-[240px] py-2 my-2 fill-amber-300 stroke-amber-200 hover:stroke-amber-700"
      />
    </div>
  );
};
