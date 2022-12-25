import React from 'react';

export const DescView = () => {
  return (
    <div className="my-2">
      복수의 꺾은선을 하나의 그래프에서 표시하고자 할 경우,
      <br />
      리액트는 주어진 데이터셋 여러 개를 map으로 돌리기만 하면 된다.
      <br />
      <br />
      여기서 css 설정(color...)까지 각각 다르게 주면
      <br />좀 더 확실하게 서로를 구분지을 수 있다.
    </div>
  );
};
