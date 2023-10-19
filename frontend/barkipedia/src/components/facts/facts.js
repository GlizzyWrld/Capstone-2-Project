import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFacts } from "../../redux/reducers/factReducer";
import { saveFact } from "../../redux/reducers/userReducer";

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
      <button onClick={() => dispatch(fetchFacts())}>Get Facts</button>
      <div>
        {factValue && factValue.data
          ? factValue.data.map((fact, index) => (
              <div key={fact.id}>
                <p>{fact.attributes.body}</p>
                <button onClick={() => handleSaveFact(fact.attributes.body)}>Save</button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Facts;
