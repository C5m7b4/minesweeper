import React, { FC, useState } from 'react';

export interface ClickCounterProps {
  defaultCount?: number;
}

const ClickCounter: FC<ClickCounterProps> = ({ defaultCount = 0 }) => {
  const [count, setCount] = useState<number>(defaultCount);
  const [evenCount, setEvenCount] = useState<number>(defaultCount);

  return (
    <div>
      <div>
        <h1>Count: {count}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
      {/* <div>
        <h1>Even Count: {evenCount}</h1>
        <button onClick={() => setEvenCount(evenCount + 2)}>+</button>
        <button onClick={() => setEvenCount(evenCount - 2)}>-</button>
      </div> */}
    </div>
  );
};

export default ClickCounter;
