import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from '../../redux/reducers/userReducer';



function Navbar() {

  const { currentUser } = useSelector((state) => state.user);
 
  const dispatch = useDispatch();

  let logout = async () => {
    dispatch(clearUser());
  }


  return (
    <div>
        <Link to="/"><h2>Barkipedia</h2></Link>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/users">Signup</Link>
        <Link to="/" onClick={logout}>Logout</Link>
        <hr/>
        <Link to="/fod">F.O.D</Link>
        <Link to="/users/facts">Facts</Link>
        <Link to={`users/saved/${currentUser}`}>Saved</Link>
        <Link to={`users/profile/${currentUser}`} >Profile</Link>
      
    </div>
  )
}

export default Navbar