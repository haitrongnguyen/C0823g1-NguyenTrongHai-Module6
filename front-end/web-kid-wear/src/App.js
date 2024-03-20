import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import { Route, Routes } from 'react-router-dom';
import HomePage from './component/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>

    </Routes>
  );
}

export default App;
