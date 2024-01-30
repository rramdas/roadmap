import React from 'react';
import FeatureCard from './FeatureCard';

function MilestoneCard({ milestone, features, onEdit, onDelete, onAddFeature }) {
  const completedFeatures = features.filter(feature => feature.status === 'Completed').length;
  const progress = (completedFeatures / features.length) * 100;

  return (
    <div className="milestone-card">
      <h3>{milestone.name}</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      {features.map(feature => <FeatureCard key={feature.id} {...feature} />)}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onAddFeature}>Add Feature</button>
    </div>
  );
}

export default MilestoneCard;
