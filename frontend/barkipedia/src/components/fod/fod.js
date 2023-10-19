import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFact } from "../../redux/reducers/factReducer";

function Fod() {
  const { factValue } = useSelector((state) => state.facts);
  const dispatch = useDispatch();

  // State to hold the countdown timer value, 24 hours
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    // Dispatch the action immediately upon mounting
    dispatch(fetchFact());

    // timer to repeat the dispatch every 24 hours
    const interval = setInterval(() => {
      dispatch(fetchFact());
    }, 24 * 60 * 60 * 1000); // 24 hours(milliseconds)

    // countdown timer that decreases every second
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the intervals on component unmount
    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [dispatch]);

  const fact = factValue && factValue.data ? factValue.data[0] : null;

  return (
    <div>
      <h1>The Fact of the Day is :</h1>
      <div>{fact ? <p key={fact.id}>{fact.attributes.body}</p> : null}</div>
      <p>
        Next Fact in: {Math.floor(timeLeft / 3600)}h {Math.floor((timeLeft % 3600) / 60)}m{" "}
        {timeLeft % 60}s
      </p>
    </div>
  );
}

export default Fod;
