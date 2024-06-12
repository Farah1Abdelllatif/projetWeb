import {BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css';
import LoginForm from './components/loginForm/loginForm';
import Dashboard from './components/Dashboard/dashboard';


function App() {
  return (
    <div >
      <BrowserRouter>
       <Routes>
        <Route path='/' element={<LoginForm/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
