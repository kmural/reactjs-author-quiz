import React, { Component } from "react";
import "./App.css";
import "./bootstrap-min.css";
import _ from "lodash";

const Header = props => {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
};

const Turn = props => {
  const bgColor = highlighter => {
    const colors = { none: "white", correct: "green", incorrect: "red" };
    return colors[bgColor];
  };

  const Book = props => {
    return (
      <div className="answer">
        <h4>{props.title}</h4>
      </div>
    );
  };

  return (
    <div className="row turn" style={{ backgroundColor: "white" }}>
      <div className="col-4 offset-1">
        <img src={props.author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {props.books.map(title => (
          <Book key={title} title={title} />
        ))}
      </div>
    </div>
  );
};

const Continue = props => {
  return <div />;
};

const Footer = props => {
  return (
    <div className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All images are from{" "}
          <a href="https://commons.wikimedia.org/wiki">Wikemedia Commons</a> and
          are in the public domain
        </p>
      </div>
    </div>
  );
};

const authors = [
  {
    name: "Mark Twain",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Mark_Twain_photo_portrait,_Feb_7,_1871,_cropped_Repair.jpg",
    imageSource: "Wikemedia Commons",
    books: ["The Adventures of Huckleberry Finn"]
  },
  {
    name: "Joseph Conrad",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Joseph_Conrad.PNG",
    imageSource: "Wikemedia Commons",
    books: ["Heart of Darkness"]
  },
  {
    name: "J.K. Rowling",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
    imageSource: "Wikemedia Commons",
    books: ["Harry Potter and the Sorcerers Stone", "Secrets of the Fire"]
  },
  {
    name: "Stephen King",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
    imageSource: "Wikemedia Commons",
    books: ["The Shining", "IT"]
  },
  {
    name: "Charles Dickens",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Charles_Dickens_by_Ary_Scheffer_1855.jpgimages/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"]
  },
  {
    name: "William Shakespeare",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
  }
];

const turnData = () => {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const randBooks = _.shuffle(allBooks).slice(0, 4);
  const answer = _.sample(randBooks);

  return {
    books: randBooks,
    author: authors.find(author => author.books.some(title => title === answer))
  };
};

class Game extends Component {
  constructor() {
    super();
    this.state = Game.initialState();
  }

  static initialState = () => ({
    turnData: turnData
  });

  resetGame = () => {
    this.setState(Game.initialState());
  };

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Turn {...this.state.turnData} />
        <Continue />
        <Footer />
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}
