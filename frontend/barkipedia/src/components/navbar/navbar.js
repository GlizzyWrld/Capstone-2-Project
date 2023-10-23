import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/reducers/userReducer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  let logout = async () => {
    dispatch(clearUser());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="nav-link">
              Barkipedia
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/auth/login" className="nav-link">
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/auth/users" className="nav-link">
              Signup
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/fod" className="nav-link">
              F.O.D
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/users/facts" className="nav-link">
              Facts
            </Link>
          </Button>
          <Button color="inherit">
            <Link to={`users/saved/${currentUser}`} className="nav-link">
              Saved
            </Link>
          </Button>
          <Button color="inherit">
            <Link to={`users/profile/${currentUser}`} className="nav-link">
              Profile
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/" onClick={logout} className="nav-link">
              Logout
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
