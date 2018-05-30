import React, { Component } from 'react';

import { getTimeRemaining, putZeroWhenNeeded } from './utils';

const days = 2;
const hours = 24;
const minutes = 60;
const seconds = 60;

class App extends Component {
  state = {
    deadline: new Date(Date.parse(new Date()) + days * hours * minutes * seconds * 1000),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
    timeInterval: null,
  }

  constructor() {
    super();

    this.updateClock = this.updateClock.bind(this);
    this.stopCountdown = this.stopCountdown.bind(this);
  }

  componentDidMount() {
    this.updateClock();
    const timeInterval = setInterval(this.updateClock, 1000);
    this.setState({timeInterval})
  }

  updateClock() {
    const time = getTimeRemaining(this.state.deadline);

    this.setState({
      days: time.days,
      hours: putZeroWhenNeeded(time.hours),
      minutes: putZeroWhenNeeded(time.minutes),
      seconds: putZeroWhenNeeded(time.seconds),
    });

    if (time.total <= 0) {
      this.stopCountdown();
      this.setState({isFinished: true})
    }
  }

  stopCountdown() {
    clearInterval(this.state.timeInterval);
  }

  render() {
    const {days, hours, minutes, seconds, isFinished} = this.state;
    return (
      <div className={`container ${isFinished ? 'is-finished' : ''}`}>
        <h1>Countdown Timer</h1>
        <div className="countdown">
          <div className="time-square">
            <span className="days">{days}</span>
            <div className="smalltext">Days</div>
          </div>
          <div className="time-square">
          <div>
            <span className="hours">{hours}</span>
            <div className="smalltext">Hours</div>
            </div>
          </div>
          <div className="time-square">
            <span className="minutes">{minutes}</span>
            <div className="smalltext">Minutes</div>
          </div>
          <div className="time-square">
            <span className="seconds">{seconds}</span>
            <div className="smalltext">Seconds</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
