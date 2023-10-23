import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../../redux/reducers/userReducer";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

function Profile() {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
    username: currentUser || ""
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteUser(currentUser));
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({username: currentUser, updateData: formData.username})).then(() => {
        alert(`Username has been updated to ${formData.username}`);
        navigate('/'); 
    }).catch((error) => {
        console.error("Error updating this user",error);
    })
    
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Username: {currentUser}</p>
        <form onSubmit={handleSubmit}>
          <label>Change Username: </label>
          <Input
            type="text"
            variant="soft"
            name="username"
            id="username"
            placeholder=" Edit Username (Optional)"
            onChange={handleChange}
          />
          <Button type="submit">
            Update Username
          </Button>
        </form>
      </div>

      <div>
        <Button variant="contained" onClick={() => navigate(`/users/saved/:${currentUser}`)}>View Saved Facts</Button>
      </div>

      <div>
        <Button onClick={handleDelete}>Delete Account</Button>
      </div>
    </div>
  );
}

export default Profile;
