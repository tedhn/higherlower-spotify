import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const App: FC = () => {
  const [a, setAuth] = useState(false);
  const client_secret = "30858fd347194880babd7cee8e625b07";
  const CLIENT_ID = "e7baec829191449ea3f360afb46049ae";
  const REDIRECT_URI = "http://localhost:3000/home/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE =
    "user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-collaborative playlist-read-private user-top-read";

  const auth = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  };

  return (
    <div className="App">
      <div onClick={auth}>Login to Spotify</div>
    </div>
  );
};

export default App;
