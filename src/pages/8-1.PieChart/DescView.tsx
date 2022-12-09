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
      막대그래프와 달리, 데이터 크기 순으로만
      <br />
      자동 나열하는 것도 특징이다.
    </div>
  );
};
