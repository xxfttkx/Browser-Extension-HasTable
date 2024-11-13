import React, { useState } from 'react';
import InputFields from './InputFields';
import { useSearch } from './useSearch';
import { useHashTable } from './useHashTable';
import RandomDisplay from './RandomDisplay';
import './Popup.css';

const Popup = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState('');
  const { hashTable, addToHashTable, removeFromHashTable, searchFromHashTable } = useHashTable(setResult);
  
  const [randomItems, setRandomItems] = useState([]);

  const handleClickSearch = () => {
    searchFromHashTable(searchKey);
  };

  const handleClickAdd = () => {
    addToHashTable(searchKey, searchValue);
  };

  const handleClickDelete = () => {
    removeFromHashTable(searchKey);
  };

  const handleClickShow = () => {
    const keys = Object.keys(hashTable);
    const selectedKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 5);
    const items = selectedKeys.map((key) => ({ key, value: hashTable[key] }));
    setRandomItems(items);
  };

  return (
    <div className="App">
      <InputFields
        searchKey={searchKey}
        searchValue={searchValue}
        onSearchKeyChange={(e) => setSearchKey(e.target.value)}
        onSearchValueChange={(e) => setSearchValue(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button onClick={handleClickSearch}>查找</button>
        <button onClick={handleClickAdd}>添加</button>
        <button onClick={handleClickDelete}>删除</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <span>{result}</span>
      </div>
      <RandomDisplay randomItems={randomItems} onClickShow={handleClickShow} />
    </div>
  );
};

export default Popup;
