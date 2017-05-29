import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import Game from './components/Game';
import Login from './components/Login';

class App extends Component {
  state = { username: '', gameOver: false };

  setUsername = (e) => {
    this.setState({ username: e.target.value });
  }


  setEndGame = (ifEnd) => {
    if (ifEnd){
      this.setState({gameOver: true});
    } else {
      this.setState({gameOver: false});
    }
  }


  render() {
    let { gameStarted, username } = this.state;
    return (
        <div>
          <Switch>
            <Route exact path='/' render={(props) => ( <Home {...props} username={username} setUsername={this.setUsername} /> )} />
            <Route path='/game' render={ (props) => ( <Game {...props} {...this.state} setUsername={this.setUsername} setEndGame={this.setEndGame} /> )} />
            <Route path='/login' component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      )
  }
}
export default App;
