import React, { Component } from 'react';
import ClockDisplay from './components/ClockDisplay';
import TimeInput from './components/TimeInput';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      initialSeconds: 0,
      timerDelay: 1000,
      isRunning: false,
      currentSpeed: 1,
      timer: null
    }
    this.handlePause = this.handlePause.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateCountDownValue = this.updateCountDownValue.bind(this);
    this.handleTimeSpeed = this.handleTimeSpeed.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.isRunning !== prevState.isRunning) {
      if (this.state.isRunning) {
        this.startTimer();
      }
    }
  }

/**
 * Starts the timer based on the current timerdelay value 
 * stored in the state
 */
  startTimer() {
    const timer = setInterval(() => {
      const newCount = this.state.count - 1;
      if (this.state.isRunning && this.state.count > 0) {
        this.setState(
          { count: newCount >= 0 ? newCount : 0 }
        );
      }
    }, this.state.timerDelay);
    this.setState({
      timer
    })
  }
/**
 * 
 * @param {Number} delay - speed value
 * Controls how fast or slow the timer should move
 */
  handleTimeSpeed(delay) {
    const timerDelay = delay === 1 ? 1000 : (1000 / delay);
    clearInterval(this.state.timer);
    this.setState({
      timerDelay,
      currentSpeed: delay
    }, () => {
      if(this.state.timer){
        this.startTimer()
      }
    })
  }
  /**
   * Toggle between pause or play when 
   * the pause button is clicked
   */
  handlePause() {
    const { isRunning, timer } = this.state;
    this.setState({
      isRunning: !isRunning
    });
    clearInterval(timer)
  }
/**
 * 
 * @param {Number} seconds 
 * - Controls the initial count down value
 * 
 */
updateCountDownValue(seconds) {
    this.setState({
      count: seconds,
      initialSeconds: seconds,
      isRunning: true
    })
  }

  render() {
    if(this.state.isRunning && this.state.count === 0){
      this.song.play();
    }
    const { count, isRunning, initialSeconds, timer } = this.state;
    const isHalfTime = (initialSeconds / 2 >= count) && count > 0;
    const text = count === 0 ? timer && 'Time is up!' : isHalfTime && 'More than halfway there!'
    return (
      <div>
        <h2 style={{
          textAlign: 'center'
        }}>Simple StopWatch</h2>
         <div className="container">
        <TimeInput setCountDown={this.updateCountDownValue} />
        {
          <h3 className={count <= 10 ? 'blink-text' : undefined} style={{
            textAlign: 'center',
            color: (count <= 20) ? 'red' : 'black'
          }}>{text}</h3>
        }
        <audio ref={(song) => { this.song = song; }}>
          <source src="/tone.mp3" type="audio/mpeg" >
          </source>
        </audio>
        <ClockDisplay isRunning={isRunning} handlePause={this.handlePause} time={count} />
        <div className="inline-button">
          <button className="control-button main-button" style={this.state.currentSpeed === 1 ? {
            backgroundColor: 'grey',
            color: '#fff'
          } : {}} onClick={() => this.handleTimeSpeed(1)}>1x</button>
          <button className="control-button main-button" style={this.state.currentSpeed === 1.5 ? {
            backgroundColor: 'grey',
            color: '#fff'
          } : {}} onClick={() => this.handleTimeSpeed(1.5)}>1.5x</button>
          <button className="control-button main-button" style={this.state.currentSpeed === 2 ? {
            backgroundColor: 'grey',
            color: '#fff'
          } : {}} onClick={() => this.handleTimeSpeed(2)}>2x</button>
        </div>
      </div>
      </div>
    )
  }
}

export default App;