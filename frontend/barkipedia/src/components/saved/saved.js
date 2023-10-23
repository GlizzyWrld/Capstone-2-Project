import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getSavedFacts, deleteFact } from "../../redux/reducers/userReducer";
import Button from '@mui/material/Button';

function Saved() {
  const dispatch = useDispatch();
  const savedFacts = useSelector((state) => state.user.facts);
  const {currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSavedFacts(currentUser));
  }, [dispatch, currentUser]);

  const handleDelete = (fact) => {
    
    dispatch(deleteFact({ username: currentUser, factBody: fact}));
    alert(`This fact has been deleted: ${fact}`);
  }

  return (
    <div>
      <h2>Saved Facts</h2>
      <ul>
        {savedFacts.map((fact, index) => (
          <li className='fact-border' key={index}>
            {fact}
            <Button size="medium" variant="contained" onClick={() => handleDelete(fact)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Saved