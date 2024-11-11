import { useState, useEffect } from 'react';

export const useHashTable = () => {
  const [hashTable, setHashTable] = useState({});

  useEffect(() => {
    const storedHashTable = localStorage.getItem('hashTable');
    if (storedHashTable) {
      setHashTable(JSON.parse(storedHashTable));
    }
  }, []);

  const addToHashTable = (key, value) => {
    const newHashTable = { ...hashTable, [key]: value };
    setHashTable(newHashTable);
    localStorage.setItem("hashTable", JSON.stringify(newHashTable));
  };

  const removeFromHashTable = (key) => {
    const newHashTable = { ...hashTable };
    delete newHashTable[key];
    setHashTable(newHashTable);
    localStorage.setItem("hashTable", JSON.stringify(newHashTable));
  };

  return {
    hashTable,
    addToHashTable,
    removeFromHashTable,
  };
};
