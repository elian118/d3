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
      <br />
      <br />
      또한, D3는 꺾은선 그래프에서 사용하는 line(x().y()) 메서드 인자 끝에
      <br />
      curve(커브 타입)을 추가 및 선택함으로써,
      <br />
      곡선의 구부러짐 형태까지도 다양하게 표현할 수 있다.
    </div>
  );
};
