import styled from 'styled-components';
import { useDrag } from 'react-dnd';


const Card = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  margin: 30px 0;
  border-radius: 10px;
  transition: transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;  // Transparent border to keep layout consistent

  &:hover {
    transform: scale(1.05);
    border: 1px solid #0f0;
    box-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;
  }
`;

const CardTitle = styled.h3`
  margin-top: 0;
  color: #0f0;
  font-size: 1.5em;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;
`;

const CardDescription = styled.p`
  margin-bottom: 0;
  color: #aaa;
`;

const CardFooter = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px inset rgba(255, 255, 255, 0.1); // Inset line for separation

  span {
    color: #08f7fe; // Neon blue color
    font-size: 0.9em;
    // font-weight: bold; // Bolder font
    // text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 15px #00f; // Neon glow effect
  }
`;


function FeatureCard({ feature }) {

    const [{ isDragging }, drag] = useDrag({
        type: 'FEATURE',
        item: { id: feature.id },
        collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
    }),
});
    
return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card>
        <CardTitle>{feature.name}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
        <CardFooter><span>{feature.epic}</span></CardFooter>
      </Card>
      </div>
    );
  }
  
  export default FeatureCard;
  