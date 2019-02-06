import React, { Component } from "react";
import "./App.css";
import "./bootstrap-min.css";
import _ from "lodash";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link } from "react-router-dom";

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

const Book = props => {
  return (
    <div className="answer" onClick={() => props.onAnswerSelected(props.title)}>
      <h4>{props.title}</h4>
    </div>
  );
};

const Turn = props => {
  const highlightColor = highlighter => {
    const colors = { none: "white", correct: "green", incorrect: "red" };
    return colors[highlighter];
  };

  return (
    <div
      className="row turn"
      style={{ backgroundColor: highlightColor(props.highlighter) }}
    >
      <div className="col-4 offset-1">
        <img src={props.author.imageUrl} className="authorimage" alt="Author" />
      </div>
      <div className="col-6">
        {props.books.map(title => (
          <Book
            key={title}
            title={title}
            onAnswerSelected={props.onAnswerSelected}
          />
        ))}
      </div>
    </div>
  );
};

const Continue = props => {
  return (
    <div className="row continue">
      {props.show ? (
        <div className="col-11">
          <button
            className="btn btn-primary btn-lg float-right"
            onClick={props.onContinue}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
};

const AddLink = props => {
  return (
    <div className="col-12 offset-1">
      <Link to="/add">Add an Author</Link>
    </div>
  );
};

const Footer = props => {
  return (
    <div className="row">
      <div className="col-12 offset-3">
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
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Charles_Dickens_by_Ary_Scheffer_1855.jpg",
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

const turnData = authors => {
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

class AuthorQuiz extends Component {
  constructor() {
    super();
    this.state = AuthorQuiz.initialState();
  }

  static initialState = () => ({
    turnData: turnData(authors),
    highlighter: ""
  });

  resetState = () => {
    this.setState(AuthorQuiz.initialState());
  };

  onAnswerSelected = answer => {
    const isCorrect = this.state.turnData.author.books.some(
      book => book === answer
    );
    this.setState({
      highlighter: isCorrect ? "correct" : "incorrect"
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Turn
          {...this.state.turnData}
          highlighter={this.state.highlighter}
          onAnswerSelected={this.onAnswerSelected}
        />
        <Continue
          show={this.state.highlighter === "correct"}
          onContinue={this.resetState}
        />
        <AddLink />
        <Footer />
      </div>
    );
  }
}

AuthorQuiz.PropTypes = {
  turnData: PropTypes.shape({
    books: PropTypes.arrayOf(PropTypes.string).isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  }),
  highlighter: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

class AuthorForm extends Component {
  constructor(props) {
    super(props);
    this.state = AuthorForm.initialState();
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static initialState = () => ({
    name: "",
    imageUrl: ""
  });

  onFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(event);
  };

  render() {
    return (
      <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="AddAuthorForm_Input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onFieldChange}
            />
          </div>
          <div className="AddAuthorForm_Input">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.onFieldChange}
            />
          </div>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/">
            <AuthorQuiz />
          </Route>
          {/* <Route exact path="/add">
            <AuthorForm />
          </Route> */}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
