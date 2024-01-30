import styled from 'styled-components';

export const PricingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c2c2c;  // Dark background
`;

export const PlanCard = styled.div`
  background-color: #3c3c3c;  // Slightly lighter than the background for contrast
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  margin: 0 20px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);  // Playful zoom effect on hover
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #FE6B8B;  // Bright color for the button
    color: white;
    transition: background-color 0.3s;

    &:hover {
      background-color: #FF8E53;  // Slight color change on hover
    }
  }
`;
