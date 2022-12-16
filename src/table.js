

import React,{ useContext } from 'react';
import { MyContext } from './mycontex';

export default function CustomTable() {
  const { list,booleanList,joined} = useContext(MyContext);
    return (
      <div>
        <table>
          <thead>
          <tr>
             {list.map((column, index) => (
              booleanList[index] &&<th key={index}>{column}</th>
             ))}
          </tr>
          </thead>
          <tbody>
          {joined?.map((row, index) => (
             <tr key={index}>
                 {list.map((column, index) => (
                   booleanList[index] && <td key={index}>{row[column]}</td>
                  ))}
             </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }


