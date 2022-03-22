import { FC } from "react";

import "./App.scss";

const App: FC = () => {
  const auth = () => {
    window.location.href = `${process.env.REACT_APP_AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${process.env.REACT_APP_RESPONSE_TYPE}&scope=${process.env.REACT_APP_SCOPE}`;
  };

  return (
    <div className="App">
      <div className="filter"></div>
      <div className="text">
        <div className="title">The Before / After Game</div>

        <div className="dsc">
          A game where you decide which song in your spotify playlist was
          released first
        </div>
        <div onClick={auth} className="button">
          Login to Spotify to play
        </div>
      </div>
    </div>
  );
};

export default App;
