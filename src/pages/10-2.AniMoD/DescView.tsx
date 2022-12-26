import React from 'react';

export const DescView = () => {
  return (
    <div className="my-4">
      산포도 또한 애니메이션 적용이 가능하다.
      <br />
      <br />
      아래 산포도는 데이터셋 갱신을 시작하면 1초마다 데이터가 갱신되는데,
      <br />
      이때마다 선택된 d3 EASE 패턴으로 점들이 움직인다.
    </div>
  );
};
