import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import AllServices from './Pages/AllServices/AllServices';
import ManageServices from './Pages/ManageServices/ManageServices';
import EditService from './Pages/EditService/EditService';
import Additem from './Pages/AddItem/Additem';
import Footer from './Pages/Footer/Footer';
import Contact from './Pages/Contact/Contact';
import AboutUs from './Pages/AboutUs/AboutUs';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import RequireAuth from './Pages/RequireAuth/RequireAuth';
import NotFound from './Pages/NotFound/NotFound';
function App() {
  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route
          path='/services'
          element={
            <RequireAuth>
              <AllServices></AllServices>
            </RequireAuth>
          }></Route>
        <Route
          path='/manage'
          element={<ManageServices></ManageServices>}></Route>
        <Route
          path='/update/:id'
          element={
            <RequireAuth>
              <EditService></EditService>
            </RequireAuth>
          }></Route>
        <Route
          path='/additem'
          element={
            <RequireAuth>
              <Additem></Additem>
            </RequireAuth>
          }></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/about' element={<AboutUs></AboutUs>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
