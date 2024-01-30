import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const PricingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c2c2c;  // Dark background
`;

const PlanCard = styled.div`
position: relative;
width: 400px;
height: 250px;
background-color: ${props => props.bgColor || '#f4f4f4'};
  border-radius: 10px;
  margin: 20px;
  margin-right: -50px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: rotate(${props => props.tilt || '-5deg'});
  transition: transform 0.3s ease, margin 0.3s ease, box-shadow 0.3s ease;
  animation: ${props => props.animate ? css `${bounce} 2s 1` : 'none'};  // Apply bounce animation based on prop

  &:hover {
    transform: scale(1.2) rotate(0);
    margin-right: 10px;
    box-shadow: 0 0 20px 5px pink;
  }

  ${props => props.popular && `
    border: 2px solid #FF5733;  // Or any other contrasting color
    box-shadow: 0px 0px 15px rgba(255, 87, 51, 0.4);  // Add a subtle glow
  `}

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

const PopularBadge = styled.div`
  position: absolute;
  top: -10px;  // Adjust as needed
  left: 50%;
  transform: translateX(-50%);
  background-color: #FF5733;  // Or any other contrasting color
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  z-index: 1;
`;

const HeroSection = styled.div`
  background-color: #333;  // Or use a background image
  color: white;
  padding: 60px 0;
  text-align: center;
  height: 0vh;
`;

const HeroHeadline = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const HeroSubheadline = styled.p`
  font-size: 1.2em;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroCTA = styled.button`
  background-color: #FF5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #FF3920;
  }
`;



function PricingPage() {
  return (


    <div>
    <HeroSection>
      <HeroHeadline>Choose the Right Plan for You</HeroHeadline>
      <HeroSubheadline>
        Whether you're an indie developer or a professional product owner, we have the perfect plan tailored for your needs.
      </HeroSubheadline>
      <HeroCTA>Start Free Trial</HeroCTA>
    </HeroSection>

    <PricingContainer>    
      <PlanCard tilt="-5deg" bgColor="#111">
        <h2>Free Plan</h2>
        <p>Hello Journeyperson! One destination is enough for you? Then this is your plan.</p>
        <button>Get Started</button>
      </PlanCard>

      <PlanCard tilt="0deg" bgColor="#222" popular animate>
      <PopularBadge>Most Popular</PopularBadge>

        <h2>Basic</h2>
        <p>You are an adventurer!
        We'll start you off with 5 destinations and a trial period of 30 days
        after which you'll pay 9.99 per month or 99 per year.
        </p>
        <button>USD 9.99 per month</button>
        <p> Cancel anytime.</p>
      </PlanCard>

      <PlanCard tilt="5deg" bgColor="#333">
        <h2>Advanced Plan</h2>
        <p>Alright, you are globetrotter. We get it. So, here's UNLIMITED destinations!</p>
        <button>Subscribe Now</button>
      </PlanCard>


    </PricingContainer>
</div>
  );
}

export default PricingPage;
