import React from 'react';

export const DescView = () => {
  return (
    <div className="text-base my-4 max-w-[500px]">
      눈금자까지 추가하려면 해당 요소를 D3로 추가하면 된다.
      <br />
      <br />
      일반적으로 눈금자 요소들은 일괄 그루핑하고
      <br />
      CSS 적용이 쉽도록 attr() 메서드로 class 속성을 부여한다.
      <br />
      이후 attr('transform', 값)으로 상하좌우 여백을 지정한 다음
      <br />
      call() 메서드로 눈금자 위치를 지정한다.
      <br />
      <br />
      또, 아래 그래프는 CSV 파일에 저장된 10가지 데이터셋을 사용한다.
      <br />
      버튼을 눌러 데이터셋을 교체해보자.
    </div>
  );
};
