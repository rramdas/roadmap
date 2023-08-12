import styled from 'styled-components';

const GanttContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  border-bottom: 2px solid #ccc;
  padding: 10px 0;
  text-align: center;
`;

const EpicRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const EpicTitle = styled.div`
  flex: 1;
  padding-right: 20px;
  font-weight: bold;
`;

const FeatureTimeline = styled.div`
  grid-column-start: ${props => props.start};
  grid-column-end: ${props => props.end};
  background-color: #007BFF;
  height: 20px;
  border-radius: 5px;
  margin: 5px 0;
`;


function GanttChart({ epics, features }) {
    const quarterToNum = (quarter) => {
      switch (quarter) {
        case 'Q1': return 1;
        case 'Q2': return 2;
        case 'Q3': return 3;
        case 'Q4': return 4;
        default: return 0;
      }
    };
  
    return (
      <GanttContainer>
        <Timeline>
          <div>Q1</div>
          <div>Q2</div>
          <div>Q3</div>
          <div>Q4</div>
        </Timeline>
  
        {epics.map(epic => (
          <EpicRow key={epic.id}>
            <EpicTitle>{epic.name}</EpicTitle>
            <Quarters>
              {features.filter(feature => feature.epicId === epic.id).map(feature => {
                const start = quarterToNum(feature.startQuarter);
                const end = quarterToNum(feature.endQuarter);
                return (
                  <FeatureTimeline key={feature.id} start={start} end={end}>
                    {/* You can render the FeatureCard component here if needed */}
                  </FeatureTimeline>
                );
              })}
            </Quarters>
          </EpicRow>
        ))}
      </GanttContainer>
    );
  }
  
  export default GanttChart;