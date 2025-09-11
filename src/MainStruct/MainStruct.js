import './MainStruct.css'
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { useState, useEffect, useRef } from 'react';
import Compare from './CompareText/Compare';
import Loading from './Loading/Loading';


//close things with
//outside click (general function in 
//case I need it anywhere else)
function useOutsideClick(ref, callback) {
  useEffect(() => {
    
    //function that I call
    function handleClick(event) {
      
      //if it is clicked and it isn't target
      if (ref.current && !ref.current.contains(event.target)) {
        
        callback();
      }
    }
    //eventlistener added and then removed after function is done
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

//main function 
function MainStruct() {
   
  const [isOpen, setIsOpen] = useState(false);//dropdown menu is open
  const [selected, setSelected] = useState('ქართული');//selected language
  const [hasText, setHasText] = useState(false);//textArea is not empty
  const [isLoading, setIsLoading] = useState(false)//loading the page
  const dropdownRef = useRef(null);//reference to dropdown component
  const compareRef = useRef();//reference to compare component

  //close dropdown menu defaultly
  useOutsideClick(dropdownRef, () => setIsOpen(false));

  //new button clears text in textArea
  const handleNew = () => {
      compareRef.current?.clear();

  };

  //compare button compares text
  const handleCompare = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoading(false);
      compareRef.current?.runCompare();
    }, 2000);
  };


  return (
    <main>
      <div className="top">
        <div className="options">
          <div className="dropdown" ref={dropdownRef}>{/*dropDown reference */}
            <button
              className="dropdown-button"
              onClick={() => setIsOpen(prev => !prev)} 
            >
              {selected} <img src="/images/arrow-drop-down-line.png" alt="▼" />
            </button>

            {isOpen && (
              <DropdownMenu chosen={setSelected} /> //dwopdown menu is shown
            )}
          </div>

          <label>
            <input type="checkbox" /> ფორმატის შენარჩუნება
          </label>
        </div>
        
        {/* add new button */}
        <div  
          id="add-new"
          className={hasText ? "not" : "activated"} /*text is in textArea and button has different color */
          onClick={handleNew}
        >
          <img src="/images/sidebar/Add.png" alt="Add" />
          <p>ახლის გახსნა</p>
        </div>
      </div>

      {/*loading starts */}
      {isLoading && <Loading />}

      {/*compare component (shown if loading is false)*/}
      <Compare
        ref={compareRef}
        onTextChange={setHasText}
        style={{ display: isLoading ? 'none' : 'flex' }}
      />
      {/**compare button */}
      <button
        id="compare-button"
        className={hasText ? "not" : "activated"}
        onClick={handleCompare}
      >
        შედარება
      </button>
    </main>
  );
}

export default MainStruct;
