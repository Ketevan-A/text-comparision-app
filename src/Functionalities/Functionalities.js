import './Functionalities.css';

function Functionalities() {
  const items = [
    { icon: '/images/sidebar/check.png', text: ['მართლმწერი'], id : 'top'},
    { icon: '/images/sidebar/Spelling.png', text: ['ტექსტის შედარება'], id:'compare-text' },
    { icon: '/images/sidebar/mic.png', text: ['ხმა', 'ტექსტი'], arrow: true, id : 'bottom'},
    { icon: '/images/sidebar/align-center.png', text: ['ტექსტი', 'ხმა'], arrow: true, id: ''},
    { icon: '/images/sidebar/programming-code-document.png', text: ['PDF კონვერტაცია'], id:'' },
  ];

  return (
    <div className="functionalities">
      {items.map((item, index) => (
        <div key={index} id = {item.id}>
           
          <img src={item.icon} className="icon" alt="icon" />
          <p>{item.text[0]}</p>
        {item.id =='compare-text' && <img src = '/images/sidebar/downArrow.png' id = 'down-arrow'/>}
          {item.arrow && (
            <>
              <img src="/images/sidebar/arrow-right.png" className="arrow" alt="arrow" />
              <p>{item.text[1]}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Functionalities;
