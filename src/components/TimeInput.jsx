import React, { Component } from 'react';

class TimeInput extends Component {
/**
 * - Triggered when the submit button is clicked on the timer
 *   input form
 * @param {HTMLEventObject} event 
 */
  onSubmit(event) {
    event.preventDefault();
    const timeInput = this.refs.seconds.value;
    if (timeInput.match(/\d/)) {
      this.refs.seconds.value = '';
      this.props.setCountDown(parseInt(timeInput, 10));
    }
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onSubmit.bind(this)}>
        <h3>Countdown: </h3> <input type="text" ref="seconds" placeholder="(Min)" />
        <button id="startButton" className="main-button submit-button" type="submit">Start</button>
      </form>
    )
  }
}


export default TimeInput;