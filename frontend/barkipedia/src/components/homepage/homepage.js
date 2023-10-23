import React from "react";
import { useSelector } from "react-redux";

function Homepage() {
  const { currentUser } = useSelector((state) => state.user);
 
  const imageURL = "https://steamuserimages-a.akamaihd.net/ugc/1756934458426121120/870EB09212BCB5CC5FEFA9619BE83242DAECE498/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true";

  //  style object for the background image
  const backgroundStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '150vh' 
  };


  return (
    <div style={backgroundStyle}>
      {currentUser ? (
        <>
          <h1 className="title">Welcome to Barkipedia {currentUser}</h1>
        </>
      ) : (
        <>
          <h1 className="title">Welcome to Barkipedia</h1>
        </>
      )}
    </div>
  );
}

export default Homepage;
