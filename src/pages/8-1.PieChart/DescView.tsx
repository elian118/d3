import React from 'react';

export const DescView = () => {
  return (
    <div className="text-base my-4 max-w-[500px]">
      원 그래프는 path 요소를 사용하고,
      <br />
      좌표와 반지름 계산에 pie(), arc()를 사용한다.
      <br />
      <br />
      준비된 arc()는 주입된 데이터에 따라 계산된
      <br />
      각각의 비율로 부채꼴 크기를 제한하게 된다.
      <br />
      <br />
      타입스크립트 환경에서는
      <br />
      arc() 타입까지 요구하니 꼭 채워두자.
    </div>
  );
};
