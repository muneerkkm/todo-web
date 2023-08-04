import First from '../components/First';
import Second from '../components/Second';
import Third from '../components/Third';
import './App.scss';


function App() {
  return (
    <>
    <div className='flex flex-col md:flex-row'>
      <First />
      <Second/>
      <Third/>
    </div>
    </>
  );
}

export default App;
