import { useState } from 'react';

export const useSearch = (searchKey, hashTable) => {
  const [result, setResult] = useState("");

  const search = async () => {
    if (!searchKey) {
      setResult("key为空");
      return;
    }
    
    if (searchKey in hashTable) {
      setResult("已存在");
      return;
    }

    try {
      const apiResponse = await fetch(`https://jisho.org/api/v1/search/words?keyword=${searchKey}`);
      const data = await apiResponse.json();

      if (data && data.result) {
        setResult(data.result);
      } else {
        setResult("未找到该单词");
      }
    } catch (error) {
      console.error("API请求失败", error);
      setResult("查询失败，请稍后再试");
    }
  };

  return { result, search };
};
