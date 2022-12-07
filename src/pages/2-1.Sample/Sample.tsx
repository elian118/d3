import React from 'react';

export const Sample = () => {
  // 이 컴포넌트는 rect 태그가 어떻게 쓰이는지 보여주는 샘플이다.
  return (
    <div>
      <h1>SVG 그래프 샘플</h1>
      <div className="text-base my-4 max-w-[500px]">
        D3는 SVG 태그 안에 있는 하위 요소로 표현된다.<br/><br/>
        아래는 막대그래프 표현을 위해<br/>
        svg 태그 안에 rect 요소를 입력한 샘플이다.<br/><br/>
        데이터 값만큼 길이가 각기 다른 rect를<br/>
        여러 개 나열함으로써 그래프로 표현 가능하다.
      </div>
      <svg id="myGraph" className="border w-[420px] h-[240px] py-2 my-2 fill-amber-500">
        <rect x="10" y="30" width="100" height="80" />
      </svg>
    </div>
  );
}