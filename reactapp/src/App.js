import logo from './logo.svg';
import './components/App.css';
import { Register } from './components/Register';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './components/Login';
import {Dashboard} from './components/Dashboard';

function App() {
  return (

<div>
  <BrowserRouter>
    <Routes> 
      <Route path='/registration' element={<Register/>}/> 
      <Route path='/login' element={<Login/>}/>   
      <Route path='/dashboard' element={<Dashboard/>}/> 
    </Routes>
  </BrowserRouter>

</div>
    
    
    

    
   
  );
}

export default App;
