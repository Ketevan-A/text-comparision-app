import './MainStruct.css'

import DropdownMenu from './DropdownMenu/DropdownMenu';
import { useState , useEffect, useRef} from 'react';
import Compare from './CompareText/Compare';

function MainStruct(){
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('ქართული');


  const dropdownRef = useRef(null);
  const compareRef = useRef();   

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  return (
    <main>
      <div className='top'>
        <div className='options'>
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selected} <img src = '/images/arrow-drop-down-line.png'/>
            </button>

            {isOpen && (<DropdownMenu chosen = {(lang) => {
              setSelected(lang);
            }}/>)}
          </div>

          <label>
            <input type='checkbox'/> ფორმატის შენარჩუნება
          </label>
        </div>
        
        <div id='add-new' className='activated'>
          <img src='/images/sidebar/Add.png' alt="Add"/>
          <p>ახლის გახსნა</p>
        </div>
      </div>

      
      <Compare ref={compareRef} />

      <button 
        id='compare-button' 
        className='not activated'
        onClick={() => compareRef.current.runCompare()}
      >
        შედარება
      </button>
    </main>
  );
}

export default MainStruct;
