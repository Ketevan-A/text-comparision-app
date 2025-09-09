import Functionalities from "../Functionalities/Functionalities";
import './Header.css'
function Header(){
    return <header>

        <img src = '/images/sidebar/chevrons-left.png' className = 'close-open' alt = 'close-open-button'></img>
        
        <div className="logo-container">
            <div className="logo"> 
                <img src="/images/mainLogo.png" alt="main-logo" className="logoPNG" />
                <img src = '/images/ENAGRAM.png' className = 'company-name' alt = 'company-Name'></img>
            </div>
           
            <img src = 'images/sidebar/menu.png' className="menu" alt = 'menu icon'/>
        </div>
        
        <Functionalities/>
    </header>
}


export default Header;