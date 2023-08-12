import React, { useState, useEffect } from 'react';
import FeatureColumn from './FeatureColumn';
import styled from 'styled-components';

const ColumnsContainer = styled.div`
  display: flex;  // Set up as a flex container
  gap: 20px;  // Optional: Adds some space between columns
`;


function RoadmapSection({ title, features, status: featureStatus }) {
  const [featureList, setFeatureList] = useState([]);
  
  const handleDrop = async(featureId, newStatus) => {
    
    const updatedFeatures = features.map((feature) => {
    
        if (feature.id === featureId) {
          return { ...feature, status: newStatus };
        }
        return feature;
      });
      setFeatureList(updatedFeatures);
  };

  return (
    <div className="roadmap-section">
      <h2>{title}</h2>
      <ColumnsContainer>
      <div className="columns-container">
        {['Coming Next', 'In Progress', 'Completed'].map(columnStatus => (
          <FeatureColumn 
            key={columnStatus} 
            status={columnStatus} 
            features={features}
            onDrop={handleDrop} 
          />
        ))}
      </div>
      </ColumnsContainer>
    </div>
  );
}

export default RoadmapSection;
