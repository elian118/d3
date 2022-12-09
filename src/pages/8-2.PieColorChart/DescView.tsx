import React from 'react';

export const DescView = () => {
  return (
    <div className="text-base my-4 max-w-[500px]">
      컬러는 직접 지정하거나,
      <br />
      D3에서 제공하는 표준 색상세트를 사용한다.
      <br />
      <br />
      D3는 schemeCategory10을 비롯해
      <br />
      다양한 색상세트를 제공한다.
      <br />
      <br />
      참고로, 아직 D3는 typescript 호환도가 낮아
      <br />원 그래프부터 any를 사용할 일이 많다.
    </div>
  );
};
