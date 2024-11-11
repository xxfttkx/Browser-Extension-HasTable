import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';
import { useEffect, useState } from 'react';


const Popup = () => {
  
  const [hashTable, setHashTable] = useState({});
  const [searchKey, setSearchKey] = useState(''); // 存储输入框的内容
  const [searchValue, setSearchValue] = useState(''); // 存储输入框的内容
  const [result, setResult] = useState('res'); // 新状态，用于存储从哈希表中获取的结果
  const [randomItems, setRandomItems] = useState([]); // 存储随机展示的单词

    // 在组件加载时，从 localStorage 获取哈希表数据
    useEffect(() => {
      const storedHashTable = localStorage.getItem('hashTable');
      if (storedHashTable) {
        setHashTable(JSON.parse(storedHashTable)); // 更新 statea
      }
    }, []);

      // 从哈希表中获取数据
  const getFromHashTable = (key) => {
    return hashTable[key] || null; // 如果找不到，返回默认值
  };

  // 处理输入框的内容
  const handleInputChange = (e) => {
    setSearchKey(e.target.value); // 更新输入框内容的 state
  };

  const handleInputChangeValue = (e) => {
    setSearchValue(e.target.value); // 更新输入框内容的 state
  };

  const handleClickSearch = async () => {
    if (!searchKey) {
      setResult("key为空");
      return;
    }
    let res = getFromHashTable(searchKey)
    if(searchKey in hashTable){
      setResult("已存在");
    }
    else{
      setResult("未添加");
    }
    if(!res){
      try {
        const apiResponse = await fetch(`https://jisho.org/api/v1/search/words?keyword=${searchKey}`);
        const data = await apiResponse.json();
        
        if (data && data.result) {
          setResult(data.result); // 假设返回的数据结构为 { result: 'some info' }
        } else {
          setResult("未找到该单词");
        }
      } catch (error) {
        console.error("API请求失败", error);
        setResult("查询失败，请稍后再试");
      }
    }
    setSearchValue(res?res:""); // 输出: 
  };
  const handleClickAdd = () => {
  if (!searchKey) {
    setResult("key为空");
    return;
  }
    const newHashTable = { ...hashTable, [searchKey]: searchValue };// 创建新的哈希表副本，并添加新的键值对
    setHashTable(newHashTable);// 更新哈希表的 state
    localStorage.setItem("hashTable", JSON.stringify(newHashTable));// 将新的哈希表持久保存到 localStorage
    setResult("添加成功");
  };
  
  const handleClickDelete = () => {
    if (!searchKey||searchKey=="") {
      setResult("key为空");
      return;
    }
    if (searchKey in hashTable) {
      // 删除哈希表中的指定项
      const newHashTable = { ...hashTable }; // 复制当前的哈希表
      delete newHashTable[searchKey]; // 删除对应的单词
      setHashTable(newHashTable); // 更新 state
      localStorage.setItem('hashTable', JSON.stringify(newHashTable)); // 保存到 localStorage
      setResult('已删除该单词'); // 可选：显示删除成功的提示
      setSearchValue("");
      console.log(searchKey, searchValue);  // 查看是否成功更新了状态
    } else {
      setResult('该单词不存在'); // 如果单词不存在，显示提示
    }
  };
  const handleClickShow = () => {
    const keys = Object.keys(hashTable);
    const selectedKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 5); // 随机选择五个键
    const items = selectedKeys.map((key) => ({ key, value: hashTable[key] })); // 获取对应的键值对
    setRandomItems(items); // 存储到 state 中
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          value={searchKey} // 输入框的值绑定到 searchKey
          onChange={handleInputChange} // 每次输入时更新 state
          placeholder="key"
          style={{ width: '135px' }}  // 设置宽度为 100px
        />
        <input
          type="text"
          value={searchValue} // 输入框的值绑定到 searchKey
          onChange={handleInputChangeValue} // 每次输入时更新 state
          placeholder="value"
          style={{ width: '135px' }}  // 设置宽度为 100px
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button onClick={handleClickSearch}>查找</button>
        <button onClick={handleClickAdd}>添加</button>
        <button onClick={handleClickDelete}>删除</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <span>{result}</span>
      </div>
      <button onClick={handleClickShow}>随机展示</button>
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

export default Popup;
