import React from "react";
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

let sub = "";

const getPost = () => {
  fetch(randomPost, urlOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("clicked");
      console.log(data);
      sub = data[0].children[0].data.subreddit;
    })
    .catch((e) => console.log(e));
};

function App() {
  return (
    <div className="App">
      <span>{sub}</span>
      <Button variant="primary" onClick={getPost}>
        Click
      </Button>
    </div>
  );
}

export default App;
