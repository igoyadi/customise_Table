// MyContext.js

import React, { useState,useRef,createContext,useEffect } from 'react';

const MyContext = createContext();

const MyProvider = props => {
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [list, setList] = useState(['Date','App','Click','Request','Response','Impression','Revenue','Rate','CTR']);
    const dragStart = (e, position) => {
      dragItem.current = position;
      console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
      dragOverItem.current = position;
      console.log(e.target.innerHTML);
    };

    const drop = (e) => {
      const copyListItems = [...list];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setList(copyListItems);
      
    };
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);


  

    const [booleanList, setBooleanList] = useState([true,true,true,true,true,true,true,true,true]);
    function toggleBoolean(index) {
      const newBooleanList = [...booleanList];
      newBooleanList[index] = !newBooleanList[index];
      setBooleanList(newBooleanList);
      console.log(booleanList)
    }
    

    const [post1, getPost1] = useState([])
    const result1 = 'http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03';
    const fetchPost1 = () => {
        fetch(result1)
          .then((res1) => res1.json())
          .then((res1) => {
          console.log(res1)
          getPost1(res1)
      })
    }
    const [post2, getPost2] = useState([])
    const result2 = 'http://go-dev.greedygame.com/v3/dummy/apps';
    const fetchPost2 = () => {
        fetch(result2)
          .then((res2) => res2.json())
          .then((res2) => {
          console.log(res2)
          getPost2(res2)
      })
    }
    const joined = post1.data?.map(Big => {
        const small = post2.data?.find(c => c.app_id === Big.app_id);
        return {
          Date: Big.date,
          App: small ? small.app_name:null,
          Request: Big.requests,
          Response: Big.responses,
          Impression: Big.impressions,
          Click: Big.clicks,
          Revenue: Big.revenue,
          Rate:  Big.requests / Big.responses * 100,
          CTR: Big.clicks / Big.impressions * 100
        };
      });
      

      useEffect(() => {
        fetchPost1()
        fetchPost2()
      }, [])
     

    function reorderColumns(data, newColumnOrder) {
      // Create an array to hold the reordered data
      const reorderedData = [];
      if (!data || !copyListItems || data.length === 0 || copyListItems.length === 0) {
        return data;
      }
    
      // Loop through the rows of the data
      for (let i = 0; i < data.length; i++) {
        // Create an object to hold the reordered row data
        const reorderedRow = {};
    
        // Loop through the columns of the row
        for (let j = 0; j < newColumnOrder.length; j++) {
          // Get the column name and value
          const columnName = newColumnOrder[j];
          const columnValue = data[i][columnName];
    
          // Add the column to the reordered row object
          reorderedRow[columnName] = columnValue;
        }
    
        // Add the reordered row to the reordered data array
        reorderedData.push(reorderedRow);
      }
    
      return reorderedData;
    }

  return (
    <MyContext.Provider value={{ list,booleanList,joined,copyListItems,dragStart,dragEnter,drop,toggleBoolean,reorderColumns }}>
      {props.children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
