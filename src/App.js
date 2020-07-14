import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const randomPost =
  "https://cors-anywhere.herokuapp.com/http://www.reddit.com/r/random/random.json";
const urlOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    origin: window.location.protocol + "//" + window.location.host,
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {
        url: "",
      },
    };
  }

  getPost = () => {
    fetch(randomPost, urlOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response[0].data.children[0].data);
        if (response[0].data.children[0].data.post_hint === "image") {
          this.setState({
            post: { url: response[0].data.children[0].data.url },
          });
        } else {
          this.getPost();
        }
        // setSubreddit(response[0].data.children[0].data.subreddit);
      })
      .catch((e) => console.log(e));
  };

  componentDidMount() {
    this.getPost();
  }

  render() {
    return (
      <div className="App">
        <Card>
          <Card.Img
            variant="top"
            src={this.state.post.url}
            className="post-image"
          />
          <Card.Body>
            <Button variant="primary" onClick={this.getPost}>
              Click
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
