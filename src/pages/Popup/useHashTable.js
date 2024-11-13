import { useState, useEffect } from 'react';

export const useHashTable = (setResult) => {
  const [hashTable, setHashTable] = useState({});

  useEffect(() => {
    const storedHashTable = localStorage.getItem('hashTable');
    if (storedHashTable) {
      setHashTable(JSON.parse(storedHashTable));
    }
  }, []);

  const addToHashTable = (key, value) => {
    if (!key) {
      setResult("key为空");
      return;
    }
    const newHashTable = { ...hashTable, [key]: value };
    setHashTable(newHashTable);
    localStorage.setItem("hashTable", JSON.stringify(newHashTable));
    setResult("已添加");
  };

  const removeFromHashTable = (key) => {
    if (!key) {
      setResult("key为空");
      return;
    }
    const newHashTable = { ...hashTable };
    delete newHashTable[key];
    setHashTable(newHashTable);
    localStorage.setItem("hashTable", JSON.stringify(newHashTable));
    setResult("已删除");
  };
  const searchFromHashTable = (key) => {
    if (!key) {
      setResult("key为空");
      return;
    }
    if (key in hashTable) {
      setResult("已存在");
      return;
    }
    setResult("未添加");
  };

  return {
    hashTable,
    addToHashTable,
    removeFromHashTable,
    searchFromHashTable
  };
};
