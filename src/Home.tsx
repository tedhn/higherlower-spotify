import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import "./Home.scss";

const Home: FC = () => {
  //https://api.spotify.com/v1
  const [token, setToken] = useState("");
  const [hscore, setHscore] = useState<any>("");
  const [total, setTotal] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [currentSongs, setCurrentSongs] = useState<Array<any>>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [gameover, setGameover] = useState<boolean>(false);

  const OnComponentLoad = async () => {
    const token = window.location.hash.split("&")[0].split("=")[1];
    const hs = window.localStorage.getItem("highscore")
      ? window.localStorage.getItem("highscore")
      : "0";
    let newSongs: Array<any> = [];

    const total = await GetTotalTracksSaved(token);

    for (let i = 0; i < 2; ++i) {
      const song = await GetRandomSong(token, total);

      newSongs = newSongs.concat(song);
    }

    setHscore(hs);
    setToken(token);
    setTotal(total);
    setCurrentSongs(newSongs);
  };

  const GetTotalTracksSaved = async (token: string) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.total;
  };

  const UpdateSongs = async () => {
    const newSong = await GetRandomSong(token, total);

    let newCurrentSongs = currentSongs;
    newCurrentSongs.shift();
    newCurrentSongs = newCurrentSongs.concat(newSong);

    setCurrentSongs(newCurrentSongs);
  };

  const GetRandomSong = async (token: string, total: number) => {
    const randomOffset = Math.floor(Math.random() * total);
    const { data } = await axios.get("https://api.spotify.com/v1/me/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 1,
        offset: randomOffset,
      },
    });

    return data.items[0];
  };

  useEffect(() => {
    setClicked(false);
    if (score === 0) {
      OnComponentLoad();
    } else {
      UpdateSongs();
    }
  }, [score]);

  useEffect(() => {
    if (score > hscore) {
      window.localStorage.setItem("highscore", score.toString());
    }
  }, [gameover]);

  const UpdateScore = () => {
    setScore(score + 1);
  };

  const HandleChoice = (choice: number) => {
    setClicked(true);

    const date1 = currentSongs[0].track.album.release_date.split("-")[0];
    const date2 = currentSongs[1].track.album.release_date.split("-")[0];

    if (choice === 0) {
      if (date2 <= date1) {
        setTimeout(() => {
          UpdateScore();
        }, 1000);
      } else {
        setGameover(true);
      }
    } else {
      if (date2 >= date1) {
        setTimeout(() => {
          UpdateScore();
        }, 1000);
      } else {
        setGameover(true);
      }
    }
  };

  const ResetGame = () => {
    setScore(0);
    setClicked(false);
    setGameover(false);
    OnComponentLoad();
  };

  return (
    <div className="Home">
      <div className="shade"></div>

      {gameover || (
        <>
          <div className="Score">
            Score : {score}
            <div>High Score : {hscore}</div>
          </div>
          <div className="vs">Vs</div>
        </>
      )}
      {gameover ? (
        //game over screen
        <div className="loser">
          <div className="filter"></div>

          <div className="score">
            <div className="text">You scored:</div>
            {score}
          </div>
          <div onClick={ResetGame} className="button">
            Play Again
          </div>
        </div>
      ) : (
        <>
          {currentSongs.map((song, index) => {
            const { track } = song;
            if (index) {
              //right panel
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${track.album.images[0].url})`,
                  }}
                  className="Wrapper"
                >
                  <div className="Text">
                    <div className="Title">"{track.name}"</div>
                    by
                    <div className="Artist">
                      {track.artists
                        .map((artist: any) => {
                          return artist.name;
                        })
                        .join(" , ")}
                    </div>
                    {!clicked ? "was released" : "was released in"}
                    {!clicked ? (
                      <>
                        <div className="Buttons">
                          <div
                            className="Before"
                            onClick={() => {
                              HandleChoice(0);
                            }}
                          >
                            Before
                          </div>
                          <div
                            className="After"
                            onClick={() => {
                              HandleChoice(1);
                            }}
                          >
                            After
                          </div>
                        </div>{" "}
                        <div className="Title">
                          "{currentSongs[0].track.name}"
                        </div>
                      </>
                    ) : (
                      <div className="Date">
                        {track.album.release_date.split("-")[0]}
                      </div>
                    )}
                  </div>
                </div>
              );
            } else {
              //left panel
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${track.album.images[0].url})`,
                  }}
                  className="Wrapper"
                >
                  <div className="Text">
                    <div className="Title">"{track.name}"</div>
                    by
                    <div className="Artist">
                      {track.artists
                        .map((artist: any) => {
                          return artist.name;
                        })
                        .join(" , ")}
                    </div>
                    was released in
                    <div className="Date">
                      {track.album.release_date.split("-")[0]}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default Home;
