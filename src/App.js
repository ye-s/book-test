import React, { Component } from 'react';
import Library from './components/Library';
import { login } from './api'
import './App.css';

class App extends Component {
  state = {token: null};

  componentWillMount() {
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
        </header>
        <Library token={this.state.token}/>
      </div>
    );
  }
}

export default App;
