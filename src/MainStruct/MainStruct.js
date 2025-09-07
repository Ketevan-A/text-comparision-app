import './MainStruct.css'
import Loading from './CompareText/Loading';
import { useState , useEffect, useRef} from 'react';
import Compare from './CompareText/Compare';
function MainStruct(){
    let languageOption = ['ქართული', 'English'];
    const languageOptions = ['ქართული', 'English']; // example
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(languageOptions[0]);
    const dropdownRef = useRef(null);


    useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);


    return <main>
      <div className='top'>
        <div className='options'>
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selected} <img src = '/images/arrow-drop-down-line.png'/>
            </button>

            {isOpen && (
              <div className="dropdown-menu">
                {languageOptions.map((lang, index) => (
                  
                    <label key={index}>
                      <input
                        type="radio"
                        name="lang"
                        checked={selected === lang}
                        onChange={() => setSelected(lang)}
                      />
                      {lang}
                    </label>
                 
                ))}
              </div>
            )}
          </div>

          <label>
            <input type='checkbox'/> ფორმატის შენარჩუნება
          </label>
        </div>
        
        <div className='add-new'>
          <img src='/images/sidebar/Add.png' alt="Add"/>
          <p>ახლის გახსნა</p>
        </div>
      </div>
        <Compare/>
   

      <button id='compare-button'>შედარება</button>
    </main>
}
export default MainStruct;