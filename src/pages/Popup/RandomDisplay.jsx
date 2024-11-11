import React from 'react';

const RandomDisplay = ({ randomItems, onClickShow }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <button onClick={onClickShow}>随机展示</button>
      </div>
      <ul>
        {randomItems.map((item) => (
          <li key={item.key}>
            {item.key}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomDisplay;
