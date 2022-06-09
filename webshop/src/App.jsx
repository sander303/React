import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import ShopsSettings from './pages/admin/ShopsSettings';
import AdminHome from './pages/admin/AdminHome';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Shops from './pages/Shops';
import AddProduct from './pages/admin/AddProduct';
import Category from './pages/admin/Category';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="" exact element={ <Home /> } />
        <Route path="cart" exact element={ <Cart /> } />
        <Route path="admin" exact element={ <AdminHome /> } />
        <Route path="poed" exact element={ <Shops /> } />
        <Route path="admin/halda-poode" exact element={ <ShopsSettings /> } />
        <Route path="admin/lisa-toode" exact element={ <AddProduct /> } />
        <Route path="admin/halda-kategooriaid" exact element={ <Category /> } />
        <Route path="*" exact element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
