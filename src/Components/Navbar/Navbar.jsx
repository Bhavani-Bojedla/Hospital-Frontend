import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Store';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.isloggedIn);
  const history = useNavigate();

  function logout() {
    dispatch(authActions.logout());
    localStorage.clear("id");
    history("/");
  }

  return (
    <nav className="p-3 px-10 bg-nav">
      <div className="container flex items-center justify-between mx-auto">      
        <Link to="/" className="text-2xl font-bold text-white">Health Tracker</Link> 
        <div>
        <ul className="flex space-x-14 ">
          <li>
            <Link to="/" className="nav-buttons">Home</Link>
          </li>
          <li>
            <Link to="/add-record" className="nav-buttons">Add Record</Link>
          </li>
          <li>
            <Link to="/profile" className="nav-buttons">Profile</Link>
          </li>
          <li>
            <Link to="/history" className="nav-buttons">Dashboard</Link>
          </li>
          <li>
            {/* <Link to="/signin" className="nav-buttons">Sign In</Link> */}
            {!isloggedIn && (
          <Link className='nav-buttons' to="/signin">
            Sign in
          </Link>
        )}

        {isloggedIn && (

          <Link onClick={logout} className='nav-buttons'>
            LogOut
          </Link>
          
        )}
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
