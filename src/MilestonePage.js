import React, { useState, useEffect } from 'react';
import MilestoneCard from './MilestoneCard';
import { fetchMilestones, fetchFeatures } from './airtableUtils'; 

function MilestonePage() {
  const [milestones, setMilestones] = useState([]);
  const [features, setFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('quarter'); // or 'completion'

  useEffect(() => {
    // Fetch milestones and features from Airtable
    const fetchData = async () => {
      const fetchedMilestones = await fetchMilestones();
      const fetchedFeatures = await fetchFeatures();
      setMilestones(fetchedMilestones);
      setFeatures(fetchedFeatures);
    };
    fetchData();
  }, []);

  // Filter and sort milestones based on user input
  console.log('searchTerm: ' + searchTerm);
  console.log('milestones: ' + milestones.length);
  const displayedMilestones = milestones.filter(m => m.name.includes(searchTerm))
    .sort((a, b) => sortOption === 'quarter' ? a.quarter - b.quarter : b.completion - a.completion);

  return (
    <div className="milestone-page">
      <input type="text" placeholder="Search..." onChange={e => setSearchTerm(e.target.value)} />
      <select onChange={e => setSortOption(e.target.value)}>
        <option value="quarter">By Quarter</option>
        <option value="completion">By Completion</option>
      </select>
      <div className="timeline">
        {displayedMilestones.map(milestone => (
          <MilestoneCard 
            key={milestone.id} 
            milestone={milestone} 
            features={features.filter(f => f.milestoneId === milestone.id)} 
            // Add handlers for edit, delete, and add feature
          />
        ))}
      </div>
    </div>
  );
}

export default MilestonePage;
