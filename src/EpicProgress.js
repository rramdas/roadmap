import React, { useState } from 'react';


function ProgressBar({ epicName, initialValue }) {
    const [progress, setProgress] = useState(initialValue);
  
    let progressColor;
    if (progress < 10) {
      progressColor = 'brightred';
    } else if (progress >= 10 && progress <= 50) {
      progressColor = 'yellow';
    } else {
      progressColor = 'brightgreen';
    }
  
    return (
      <div className="epic-progress-item">
        <h2>{epicName}</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: progressColor }}></div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={(e) => setProgress(e.target.value)} 
          />
        </div>
        <p>{progress}%</p>
      </div>
    );
  }
  

function EpicProgress() {
  return (
    <div className="epic-progress">
      <ProgressBar epicName="Word Add-in" initialValue={75} />
      <ProgressBar epicName="Data Sharing" initialValue={10} />
      {/* Add more ProgressBar components for other epics as needed */}
    </div>
  );
}


export default EpicProgress;