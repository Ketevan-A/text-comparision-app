import './DropdownMenu.css'
import { useState } from 'react';

//in option menu dropdown menu for chosing a language
function DropdownMenu({chosen}){
   
    const languageOptions = ['ქართული', 'English'];  //language array
    const [selected, setSelected] = useState(languageOptions[0]); //selected language status
    
    return <div className="dropdown-menu">
                {languageOptions.map((lang, index) => ( //map through language array
                  <label key={index}>
                    <input
                      type="radio"
                      name="lang"
                      checked={selected === lang}
                      onChange={() => {
                        setSelected(lang); //change selected in useState callback
                        chosen(lang); //tell parent about users choice 
                    }}
                    />
                    {lang} 
                  </label>
                ))}
              </div>
}
export default DropdownMenu;