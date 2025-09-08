import './DropdownMenu.css'
import { useState } from 'react';
function DropdownMenu({chosen}){
    const languageOptions = ['ქართული', 'English']; 
    const [selected, setSelected] = useState(languageOptions[0]);
    
    return <div className="dropdown-menu">
                {languageOptions.map((lang, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name="lang"
                      checked={selected === lang}
                      onChange={() => {
                        setSelected(lang);
                        chosen(selected);
                    }}
                    />
                    {lang}
                  </label>
                ))}
              </div>
}
export default DropdownMenu;