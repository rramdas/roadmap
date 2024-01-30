import React from 'react';
import styled from 'styled-components';
import HillChart from './HillChart';

const data = [
  { x: 10, color: 'red', size: 5, description: 'Task 1' },
  { x: 40, color: 'blue', size: 7, description: 'Task 2' },
  { x: 70, color: 'green', size: 10, description: 'Task 3' },];
  
const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
`;

const CallToAction = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  color: #FE6B8B;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF8E53;
  }
`;

function LandingPage() {
  return (
    <LandingContainer>
      <Title>Welcome to Product Roadmap!</Title>
      <Subtitle>No more Gantt charts, no more lies.</Subtitle>
      <CallToAction>Get Started</CallToAction>

      <HillChart data={data} />

    </LandingContainer>
  );
}

export default LandingPage;
