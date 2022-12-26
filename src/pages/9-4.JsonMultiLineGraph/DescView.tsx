import React from 'react';

export const DescView = () => {
  return (
    <div className="my-2">
      데이터 형식은 객체와 배열이 조합됨에 따라 더 복잡해질 수 있으며,
      <br />
      웹에서 전달되는 JSON 또한 보통은 복잡하다.
      <br />
      <br />이 경우, 필요한 데이터 값만 필터링해 D3 계산 메서드에 넣어주고
      <br />
      state 타입 역시 이에 맞게 설정하는 사전 작업을 해줘야 한다
      <br />
      <br />
      이전과 차이점은 useState 훅과 DrawGraph 컴포넌트 myLines를 살피면 된다.
      <br />
      아래는 x축 눈금자에 ticks(), ticksFormat()까지 적용한 모습이다.
    </div>
  );
};
