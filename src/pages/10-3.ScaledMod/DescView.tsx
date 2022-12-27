import React from 'react';

export const DescView = () => {
  return (
    <div className="my-4">
      산포도의 x, y축 눈금도 앞서 보여준 방식과 동일하게 그릴 수 있다.
      <br />
      <br />
      점들이 눈금 외부로 빠져나가지 못하도록
      <br />
      x, y좌표 각각 오프셋을 보정치를 부여(updateGraph() 참고)하고
      <br />
      정확한 표시를 위해 y축 눈금은 transform 속성에서 y좌표 최대값(maxY)를
      빼줘야 한다.
      <br />
      <br />
      그런데, 아래처럼 최대 원점 좌표값에 따라
      <br />
      X축과 Y축 최대 스케일(눈금)이 자동 조정되도록 해놓은 경우,
      <br />
      반드시 애니메이션과 스케일링이 데이터셋 변경 직후 실행되도록 로직을 짜야
      한다.
    </div>
  );
};
