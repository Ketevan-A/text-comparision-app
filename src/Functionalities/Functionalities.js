import './Functionalities.css'


function Functionalities(){

return <div className="functionalities">
        <div>
            <img src = '/images/sidebar/check.png' className='icon' alt = 'check'/>
            <p>მართლმწერი</p>
        </div>
        <div id = 'compare-text'>
            <img src = '/images/sidebar/Spelling.png'  className='icon' alt = 'compare'/>
            <p>ტექსტის შედარება</p>
        </div>
        <div>
            <img src = '/images/sidebar/mic.png'  className='icon' alt = 'speech-text'/>
            <p>ხმა </p>
            <img src = '/images/sidebar/arrow-right.png' className = 'arrow' alt = 'arrow'/>
            <p>ტექსტი</p>
        </div>
        <div>
            <img src = '/images/sidebar/align-center.png'  className='icon'  alt = 'text-speech'/>
            <p>ტექსტი</p>
            <img src = '/images/sidebar/arrow-right.png' className = 'arrow' alt = 'arrow'/>
              <p>ხმა</p>          
        </div>
        <div>
            <img src = '/images/sidebar/programming-code-document.png'  className='icon' alt = 'convert'/>
            <p>PDF კონვერტაცია</p>
        </div>

    </div>
}
export default Functionalities;