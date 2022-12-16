
import React,{ useState,useContext} from 'react';
import './header.css'
import { MyContext } from './mycontex';


export default function Header() {
    const [visible, setVisible] = useState(false);
    const { list,dragStart,dragEnter,drop,toggleBoolean } = useContext(MyContext);
    return (
      <>
      <h1>Analytics</h1>
         <button className='settings-button' onClick={() => setVisible(!visible)}>
            Settings
        </button>
      {visible && 
      list&&
      list.map((item, index) => (
        <button
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={drop}
          className='column-button draggable' 
          key={index}
          onClick={() => toggleBoolean(index)}
          draggable="true">
            {item}
        </button>
        ))}
        
      </>
    );
  };

    