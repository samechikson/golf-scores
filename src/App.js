import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: [...Array(18).fill(0)],
      rounds: []
    }
  };

  addHole(evt, index) {
    let newRound = [].concat(this.state.round);
    newRound[index] = +evt.target.value;
    this.setState({
      round: newRound
    })

    if (index < 17)
      this.refs["hole" + (index + 1)].focus();
    else
      this.refs["submitRound"].focus();
  }

  submitRound(event) {
    event.preventDefault();
    console.log('submitting', this.state.round);
    let newRounds = [].concat(this.state.rounds);
    this.setState({
      rounds: newRounds.concat([this.state.round])
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.rounds);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Golf App</h2>
        </div>
        <form className="Enter-round">
          <h4>Enter a Round</h4>
          { this.state.round.map((val, i) => {
            return <input
              className="Enter-hole"
              key={i}
              type="number"
              onChange={evt => this.addHole(evt, i) }
              ref={"hole" + i}/>
          })}
          <button onClick={this.submitRound.bind(this)} ref="submitRound">Submit Round</button>
        </form>
        <div className="Rounds">
          <h4>Rounds</h4>
          { this.state.rounds.map((round, i) => {
            return <ul>
              { round.map((hole, j) => {
                return <li key={"showHole" + i + j}>{hole}</li>
              })}
            </ul>
          })}
        </div>
      </div>
    );
  }
}

export default App;
