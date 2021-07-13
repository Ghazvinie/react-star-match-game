import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="null" />
        <div className="info">
          <div className="name">{profile.name}.</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    // this.userNameInput = React.createRef();
    this.handleSubmit = async (event) => {
      event.preventDefault();
      const res = await fetch(`https://api.github.com/users/${this.state.userName}`, {
        method: 'get'
      });
      const data = await res.json();
      if (data.message === 'Not Found') {
        this.props.onError('User Not Found')
      } else {
        this.props.onSubmit(data)
      }
      this.setState({ userName: '' });
    };
    this.state = {
      userName: ''
    };
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          placeholder="GitHub username"
          // ref={this.userNameInput} 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}></input>
        <button>Add Card</button>
        <div>{this.props.error}</div>
      </form>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card {...profile} key={profile.id} />)}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      error: ''
    };
    this.addNewProfile = (profileData) => {
      this.setState(prevState => ({
        profiles: [...prevState.profiles, profileData]
      }))
    }
    this.handleError = (error) => {
      this.setState({error})
    }
  }
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} onError={this.handleError} error={this.state.error} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(
  <App title="The GitHub Cards App" />,
  document.getElementById('root'),
);

reportWebVitals();