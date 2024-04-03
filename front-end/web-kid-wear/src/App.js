
import { Route, Routes } from 'react-router-dom';
import Hompage from './component/Hompage';
import Cart from './component/Cart';
import DetailProduct from './component/DetailProduct';
import Blog from './component/Blog';


function App() {
  return (

    <Routes>
      <Route path='/' element={<Hompage />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/product/:id' element={<DetailProduct />}></Route>
      <Route path='/blog' element={<Blog />}></Route>

    </Routes>
  );
}

export default App;
