
import './App.css';
import MainStruct from './MainStruct/MainStruct';
import Header from './Header/Header';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <Header/>
        <Footer/>
      </div>
      <MainStruct/>
    </div>
  );
}

export default App;
