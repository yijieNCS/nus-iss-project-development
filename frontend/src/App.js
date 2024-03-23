import './App.css';
<<<<<<< HEAD
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
=======
import AppRoutes from "./route/Routes";

function App() {
  return (
    <div className="App">
      <AppRoutes/>
    </div>
>>>>>>> main
  );
}

export default App;
