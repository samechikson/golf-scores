import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyDVzBwvj1wapOtMCZP66quyMroD5IyZnSU",
    authDomain: "golf-scores-9aba5.firebaseapp.com",
    databaseURL: "https://golf-scores-9aba5.firebaseio.com",
    projectId: "golf-scores-9aba5",
    storageBucket: "golf-scores-9aba5.appspot.com",
    messagingSenderId: "956334873971"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCourse: '',
      courses: [],
      round: [...Array(18).fill(0)],
      rounds: []
    }
  };

  componentDidMount() {
    const coursesRef = firebase.database().ref().child('courses');
    coursesRef.once('value', courses => {
      let coursesArray = [];
      for (var course in courses.val()) {
        coursesArray.push(courses.val()[course]);
      }
      console.log(coursesArray);
      this.setState({
        courses: coursesArray
      })
    })
  }

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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Golf App</h2>
        </div>
        <form className="Enter-round">
          <h4>Enter a Round</h4>
          <label>
            Choose a course
            <select value={this.state.selectedCourse}>
              {this.state.courses.map((course, key) => {
                return <option key={course.courseName.trim() + key} value={course.courseName.trim()}>{course.courseName}</option>
              })}
            </select>
          </label>
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
