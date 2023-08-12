import React from 'react';
import styled , {keyframes} from 'styled-components';

const TopBarContainer = styled.div`
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 2%;  // 2% horizontal padding for margins on both sides
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;


// Create a keyframes animation for the glimmer effect
const glimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const LoginLink = styled.a`
  color: white;
  text-decoration: underline;
  padding: 5px 10px;
//   margin: 0 40px;
//   border: 1px solid white;
//   border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const SignupButton = styled.button`
  margin: 0 40px;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

//   &:hover {
//     background-color: white;
//     color: black;
//   }

  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  background-position: 200% 0;

  &:hover {
    animation: ${glimmer} 2.5s infinite;
  }
`;

export default function TopBar({ message }) {
    return (
      <TopBarContainer>
        <span>{message}</span>  {/* Marketing message on the left */}
        <div>
          <LoginLink href="/login">Sign In</LoginLink>  {/* Login link */}
          <SignupButton onClick={() => { /* Handle navigation or modal popup for signup */ }}>
            Pricing & Signup
          </SignupButton>  {/* Pricing button */}
        </div>
      </TopBarContainer>
    );
  }
  
