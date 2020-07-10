import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

const randomPost =
  "https://cors-anywhere.herokuapp.com/http://www.reddit.com/r/random/random.json";
const urlOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    origin: window.location.protocol + "//" + window.location.host,
  },
};

function App() {
  const [subreddit, setSubreddit] = useState("");
  const getPost = () => {
    fetch(randomPost, urlOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0].data.children[0].data);
        if (response[0].data.children[0].data.post_hint === "image") {
          setSubreddit(response[0].data.children[0].data.url);
        } else {
          getPost();
        }
        // setSubreddit(response[0].data.children[0].data.subreddit);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <img src={subreddit} className="post-image" />
      <Button variant="primary" onClick={getPost}>
        Click
      </Button>
    </div>
  );
}

export default App;
