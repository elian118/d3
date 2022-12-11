import React from 'react';

export const DescView = () => {
  return (
    <div className="mt-4">
      리액트에서는 텍스트 요소를 SVG 안에 직접 입력하면 된다.
      <br />
      요소 위치를 직관적ㅇ로 예상할 수 있어, 기존 D3 방식보다 훨씬 간편하다.
      <br />
      <br />
      단, 부채꼴 안에 위치할 텍스트는
      <br />
      D3의 centroid() 메서드로 가운데 좌표를 알아내는 편이 더 좋다.
      <br />
      <br />이 예제는 부채꼴 가운데 좌표 계산과 애니메이션 설정만 D3에 맡긴다.
    </div>
  );
};
