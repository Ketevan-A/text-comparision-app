import './MainStruct.css'
import DropdownMenu from './DropdownMenu/DropdownMenu';
import { useState, useEffect, useRef } from 'react';
import Compare from './CompareText/Compare';
import Loading from './Loading/Loading';
// reusable hook for outside click
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

function MainStruct() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('ქართული');
  const [hasText, setHasText] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null);
  const compareRef = useRef();

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const handleNew = () => {
    setIsLoading(true); 
    setTimeout(() => {
      setIsLoading(false); 
      compareRef.current?.clear();
    }, 2000);
  };

  const handleCompare = () => {

      compareRef.current?.runCompare();

  };

  return (
    <main>
      <div className="top">
        <div className="options">
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="dropdown-button"
              onClick={() => setIsOpen(prev => !prev)}
            >
              {selected} <img src="/images/arrow-drop-down-line.png" alt="▼" />
            </button>

            {isOpen && (
              <DropdownMenu chosen={setSelected} />
            )}
          </div>

          <label>
            <input type="checkbox" /> ფორმატის შენარჩუნება
          </label>
        </div>

        <div
          id="add-new"
          className={hasText ? "not" : "activated"}
          onClick={handleNew}
        >
          <img src="/images/sidebar/Add.png" alt="Add" />
          <p>ახლის გახსნა</p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Compare ref={compareRef} onTextChange={setHasText} />
      )}
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
