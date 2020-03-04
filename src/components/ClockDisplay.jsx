import React from 'react';


const ClockDisplay = ({ time, isRunning, handlePause }) => {
    const renderTime = (time) => {
        let seconds = time % 60;
        let minutes = Math.floor(time / 60);
        minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
        seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
        return minutes + ':' + seconds;
    }
    return (
        <div className="displayedTime">
            <h1 id="timer" style={{
                textAlign: 'center',
                padding: 30
            }}>{renderTime(time)}</h1>
            {time > 0 && <button onClick={handlePause} className="pauseButton">{isRunning ? '▐▐' : '►'}</button>}
        </div>
    )
}

export default ClockDisplay;