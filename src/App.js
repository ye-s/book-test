import React, { Component } from 'react';
import Library from './components/Library';
import { login } from './api'
import './App.css';

class App extends Component {
  state = {token: null};

  componentWillMount() {
    //todo retrieve bookshelfs from server
    login().then(token => {
        this.setState({token});
    });
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="nav-wrapper">
            <h1>Library</h1>
          </div>
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <Library token={this.state.token}/>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
