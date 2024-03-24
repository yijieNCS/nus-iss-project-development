import './App.css';
import {BrowserRouter, Routes, Route, Link,NavLink} from 'react-router-dom'

//pages
import Login from './pages/login/Login';
import Registration from './pages/registration/Registration';


function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registration" element={<Registration />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
