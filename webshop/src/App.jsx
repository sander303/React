import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import AdminHome from './pages/AdminHome';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="" exact element={ <Home /> } />
        <Route path="cart" exact element={ <Cart /> } />
        <Route path="admin" exact element={ <AdminHome /> } />
      </Routes>
    </div>
  );
}

export default App;
