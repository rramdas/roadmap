import React from 'react';
import { useDrop } from 'react-dnd';
import FeatureCard from './FeatureCard';  // Assuming you have this component in the same directory\
import styled from 'styled-components';

const ColumnContainer = styled.div`
flex: 1;  // This ensures each column takes up an equal width

  background-color: #111;  // Almost black
//   border-right: 2px inset rgba(255, 255, 255, 0.1);  // Inset vertical divider
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s;
  min-height: 100vh;  // This ensures the column takes up the full viewport height


  &:hover {
    transform: scale(1.01);  // Slight zoom on hover for a "sexy" effect
  }

  &:last-child {
    border-right: none;  // Remove the right border for the last column
  }
`;

const ColumnHeader = styled.h3`
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
  margin-bottom: 20px;
`;


function FeatureColumn({ status, features, onDrop }) {

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }}>

    <ColumnContainer ref={drop}>
      <ColumnHeader>{status}</ColumnHeader>
      { features.filter(feature => feature.status === status).map((feature, index) => (
        <FeatureCard key={index} name={feature.name} description={feature.description} epic={feature.epic} />
      ))}

    </ColumnContainer>
    </div>
  );
}

export default FeatureColumn;