import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFacts } from "../../redux/reducers/factReducer";
import { saveFact } from "../../redux/reducers/userReducer";
import Button from '@mui/material/Button';

function Facts() {
  const { factValue } = useSelector((state) => state.facts);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSaveFact = (fact) => {
    dispatch(saveFact({ username: currentUser, fact }));
    alert(`Fact has been saved: ${fact}`)
  };

  return (
    <div>
      <Button size="medium" variant="contained" onClick={() => dispatch(fetchFacts())}>Get Facts</Button>
      <div>
        {factValue && factValue.data
          ? factValue.data.map((fact, index) => (
              <div className="fact-border" key={fact.id}>
                <p>{fact.attributes.body}</p>
                <Button size="medium" variant="contained" onClick={() => handleSaveFact(fact.attributes.body)}>Save</Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Facts;
