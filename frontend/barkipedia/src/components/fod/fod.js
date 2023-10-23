import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFact, fetchImage } from "../../redux/reducers/factReducer";

function Fod() {
  const { factValue, imageUrl } = useSelector((state) => state.facts);
  const dispatch = useDispatch();

  // State to hold the countdown timer value, minute and a half
  const [timeLeft, setTimeLeft] = useState(90);

  useEffect(() => {
    // Dispatch the action immediately upon mounting
    dispatch(fetchFact());
    dispatch(fetchImage());

    // timer to repeat the dispatch every minute and a half
    const interval = setInterval(() => {
      dispatch(fetchFact());
      dispatch(fetchImage());

      setTimeLeft(90);
    }, 90 * 1000); // minute and a half(milliseconds)

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

  const backgroundStyle = {
    backgroundColor: `skyblue`,
  };

  return (
    <div style={backgroundStyle}>
      <h1>Here are the facts of the day:</h1>
      <div className="fact-border">
        {fact ? <p key={fact.id}>{fact.attributes.body}</p> : null}
      </div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Dog"
          style={{ width: "100%", maxWidth: "500px" }}
        />
      ) : null}
      <p>
        Next Fact in: {Math.floor((timeLeft % 3600) / 60)}m {timeLeft % 60}s
      </p>
    </div>
  );
}

export default Fod;
