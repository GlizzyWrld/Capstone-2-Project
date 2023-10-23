import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { signupUser } from "../../redux/reducers/userReducer";
import { useNavigate } from 'react-router-dom';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    saved_facts: []
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
    dispatch(signupUser(formData));
    navigate('/');
  };

  const imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTad2AgbxdkUcqhdkC9SIKg8nI2VRgi-U-kyg&usqp=CAU";
  //  style object for the background image
  const backgroundStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh' 
  };

  return (
    <div style={backgroundStyle}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <Input
            type="text"
            placeholder="Create your username"
            size="md"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email: </label>
          <Input
            type="email"
            placeholder="Enter a valid email"
            size="md"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <Input
            type="password"
            placeholder="Create your password"
            size="md"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <br/>
        <Button type="submit" variant="contained">Signup</Button>
      </form>
    </div>
  );
}

export default Signup;
