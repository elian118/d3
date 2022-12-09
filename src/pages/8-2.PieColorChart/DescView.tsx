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
      단, 색상 설정은 아직 typescript와 비친화적라
      <br />
      any를 사용할 일이 많다.
    </div>
  );
};
