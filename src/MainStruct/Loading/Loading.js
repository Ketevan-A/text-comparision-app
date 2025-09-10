import './Loading.css';
import { useState, useEffect } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0); 
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className='loading-container' style={{ display: 'flex' }}>
      <div className='loading'>
        <img src='/images/loading/icons.png' alt='loading icon' />
        <div className='information'>
          <img src='/images/loading/information.png' alt='text-message' />
          <div id="moving">
            <p id="percentage">{progress}%</p>
            <div className="loading-bar-container">
              <div id="loading-line" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
