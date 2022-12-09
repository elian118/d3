import React from 'react';

export const DescView = () => {
  return (
    <div className="text-base my-4 max-w-[500px]">
      세로형 막대그래프 코드도 가로형과 거의 유사하다.
      <br />
      단, 세로형은 y좌표 원점이 맨 위에서 시작하며,
      <br />
      아래로 갈 수록 숫자가 커지는 구조다.
      <br />
      <br />
      즉, 코드로 입력하는 y좌표 값을 절대값으로 간주해야 한다.
    </div>
  );
};
