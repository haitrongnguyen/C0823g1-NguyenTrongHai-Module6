import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Hompage from './component/Hompage';

function App() {
  return (

    <Routes>
      <Route path='/' element={<Hompage />}></Route>
    </Routes>
  );
}

export default App;
