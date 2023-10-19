import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Homepage() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      {currentUser ? (
        <>
          <h1>Welcome to Barkipedia {currentUser}</h1>
          <Link to="/fod">Fact of the Day</Link>
        </>
      ) : (
        <>
          <h1>Welcome to Barkipedia</h1>
          <Link to="/auth/users">Signup</Link>
          <br />
          <Link to="/auth/login">Login</Link>
          <br />
          <Link to="/fod">Fact of the Day</Link>
        </>
      )}
    </div>
  );
}

export default Homepage;
