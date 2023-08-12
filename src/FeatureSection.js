import React from 'react';

function FeatureSection({ title, description, epic, status }) {
  
    let iconClass = "";

    console.log('feature status:' + status);

    switch (status) {
        case "Completed":
          iconClass = "feature-icon-completed";
          break;
        case "In Progress":
          iconClass = "feature-icon-in-progress";
          break;
        case "Coming Next":
          iconClass = "feature-icon-coming-next";
          break;
        default:
          break;
    }
  return (
    <div className="feature-section">
       <div className={`feature-icon ${iconClass}`}  style={{ position: 'relative' }}>  

       <svg width="200" height="200" viewbox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="10"  stroke-width="2">
    <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/>
  </circle>
  <circle cx="20" cy="20"  r="10"/>
</svg>

<div className="epic-tooltip" style={{ top: '50px', left: '10%', transform: 'translateX(-50%)' }}>
          {epic}
        </div>
        </div>
       <div className="feature-content">
            {status === "In Progress" && <span className="in-progress-label">In Progress</span>}
            <h3>{title}</h3>
            <p>{description}</p>
            {epic && <p className="feature-epic">{epic}</p>} {/* Display the epic if it exists */}
        </div>
    </div>
  );
}

export default FeatureSection;
