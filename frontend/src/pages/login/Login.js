import {BrowserRouter, Routes, Route, Link,NavLink} from 'react-router-dom'

const Login = () => {
    return ( 
        <div>
            <h1>Login Page</h1>
            <NavLink to="registration">Registration</NavLink>         
        </div>

     );
}
 
export default Login;