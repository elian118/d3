import './App.css';
import { useEffect, useState } from 'react';
import { BottomBtn } from '@/pages/BottomBtn';
import { compList } from '@/consts/compList';

const App = () => {
  const [disIdx, setDisIdx] = useState<number>(0);

  useEffect(() => {
    setDisIdx(14);
  }, []);

  return (
    <div className="App">
      {compList[disIdx]}
      <BottomBtn disIdsState={[disIdx, setDisIdx]} />
    </div>
  );
};

export default App;
