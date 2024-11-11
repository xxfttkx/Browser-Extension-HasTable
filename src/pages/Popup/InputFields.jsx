import React from 'react';

const InputFields = ({ searchKey, searchValue, onSearchKeyChange, onSearchValueChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <input
        type="text"
        value={searchKey}
        onChange={onSearchKeyChange}
        placeholder="key"
        style={{ width: '135px' }}
      />
      <input
        type="text"
        value={searchValue}
        onChange={onSearchValueChange}
        placeholder="value"
        style={{ width: '135px' }}
      />
    </div>
  );
};

export default InputFields;