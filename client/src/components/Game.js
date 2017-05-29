import React, { Component } from 'react';
import { logout } from '../fakeAuth';
import Board from './Board';
import K1 from '../images/k1.png';
import K4 from '../images/k4.png';
import K7 from '../images/k7.png';
import K6 from '../images/k6.png';


class Game extends Component {

  cards = [
    { flipped: false, matched: false, icon: K1},
    { flipped: false, matched: false, icon: K4},
    { flipped: false, matched: false, icon: K1},
    { flipped: false, matched: false, icon: K4},
    { flipped: false, matched: false, icon: K7},
    { flipped: false, matched: false, icon: K6},
    { flipped: false, matched: false, icon: K7},
    { flipped: false, matched: false, icon: K6}
  ]

  gameStartTime = Date.now();

  state = { cards: this.cards,
            flippedCardIndexes: [],
            matchedCardIndexes: [],
            timeSpend:null,
            fastestTime:9999,
            allowClick: true
          };


  checkMatch = () => {
    let flippedCardIndexes = this.state.flippedCardIndexes;

      let currFlipIndex = flippedCardIndexes[flippedCardIndexes.length-1];
      let prevFlipIndex = flippedCardIndexes[flippedCardIndexes.length-2];
      let {cards} = this.state;
      let {matchedCardIndexes} = this.state;
      if(cards[currFlipIndex].icon === cards[prevFlipIndex].icon) {
        cards[currFlipIndex].matched = true;
        cards[prevFlipIndex].matched = true;
        matchedCardIndexes = [ ...matchedCardIndexes, prevFlipIndex, currFlipIndex];
        this.setState({matchedCardIndexes});
      } else {
        cards[currFlipIndex].flipped = false;
        cards[prevFlipIndex].flipped = false;
        flippedCardIndexes = flippedCardIndexes.slice(2);
        this.setState({flippedCardIndexes});
      }
      this.setState({cards},()=>{
        this.setState({allowClick: true})
        setTimeout(this.checkGameOver(),100);
      });
  }

  checkGameOver = () => {
    let matchCount = this.state.matchedCardIndexes.length;
    let {fastestTime} = this.state;
    if (matchCount === 8){
      this.props.setEndGame(true);
      let timeSpent = ((Date.now() - this.gameStartTime)/1000).toFixed(2);
      this.setState({timeSpent});
      if(fastestTime >= timeSpent) {
        this.setState({fastestTime:timeSpent});
      }
    }
  }

  updateCard = (cardIndex, flipped = false, matched = false) => {
    let cards = this.state.cards.map( (card, loopIndex) => {
      if(cardIndex === loopIndex)
        return { ...card, flipped, matched };
      else
        return card;
    })
    let newFlippedIndex = [...this.state.flippedCardIndexes,cardIndex];
    if (newFlippedIndex.length%2 === 0 && newFlippedIndex.length !== 0){
      this.setState({allowClick: false});
    }
    this.setState({ cards:cards });
    this.setState({flippedCardIndexes:newFlippedIndex}, () => {
      if (newFlippedIndex.length%2 === 0 && newFlippedIndex.length !== 0) {
        setTimeout(this.checkMatch,800);
      }
    });

  }

  newGame = () => {
    this.setState({cards: this.cards, flippedCardIndexes: [], matchedCardIndexes: [], timeSpent:null });
    this.props.setEndGame(false);
    this.shuffleCards();
    this.gameStartTime = Date.now();

  }

  endAll = () => {
    this.newGame();
    this.setState({fastestTime:9999});
    this.props.history.push('/');
  }

  shuffleCards = () => {
    let cardLength = this.cards.length;
    let cards = this.cards;
    let randomIndex;
    let tempValue;
    while(0 !== cardLength){
      randomIndex = Math.floor(Math.random()*cardLength);
      cardLength--;
      tempValue= cards[cardLength];
      cards[cardLength] = cards[randomIndex];
      cards[randomIndex] = tempValue;
    }
    this.cards = [...cards];
  }

  render(){
    let { username, gameStarted, gameOver, setUsername} = this.props;
    let {fastestTime, timeSpent, allowClick} = this.state;
    return(
      <div className='container'>
        <h1 className='text-center'>React Memory Match</h1>
        <div className='text-right'>
          <a className='btn btn-danger' onClick={() => {
            this.newGame();
            this.setState({fastestTime:9999});
            logout()
            this.props.history.push('/login')
          }}>Logout</a>
        </div>
        <h4>Current Player: </h4>
        <input value={username} id="username" onChange={setUsername}/>

        <h4>Current Game Time: {timeSpent}</h4>
        {fastestTime !== 9999 && <h4>Fastest Time: {this.state.fastestTime}</h4> }

        <button className="btn-primary" style={{margin:'30px'}} onClick={this.endAll}>Home Page</button>
        {gameOver && <button className="btn-primary"  onClick={this.newGame}>New Game</button>}

        <Board cards={ this.state.cards } updateCard={ this.updateCard } allowClick={allowClick} />
      </div>
    );
  }
}

export default Game;
