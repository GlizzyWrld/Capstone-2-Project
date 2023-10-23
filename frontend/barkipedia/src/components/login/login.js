import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/reducers/userReducer";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then(() => {
        navigate('/');
    })
    
  };
  const imageURL = "https://p16-sign-va.tiktokcdn.com/tos-maliva-p-0068/50c6574a5f884e8f961837d93f4d5a14_1637918485~tplv-photomode-zoomcover:720:720.jpeg?x-expires=1697810400&x-signature=bdu3s%2F56mSomXKUQ2S0%2FXKT7roE%3D";
  //  style object for the background image
  const backgroundStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '190vh' 
  };

  return (
    <div style={backgroundStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <Input
            size="lg"
            placeholder="Enter your username"
            variant="soft"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <Input
            size="lg"
            placeholder="Enter your password"
            variant="soft"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br/>
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </div>
  );
}

export default Login;
