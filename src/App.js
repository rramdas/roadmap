import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, NavLink as RouterNavLink } from 'react-router-dom';
import Airtable from 'airtable';
import LandingPage from './LandingPage';
import MilestonePage from './MilestonePage';
import PricingPage from './PricingPage';
import RoadmapPage from './RoadmapPage';
import styled from 'styled-components';
import { updateFeatureInAirtable, saveFeatureToAirtable } from './airtableUtils';

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

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px; // Space between links and login button
  justify-content: flex-end;  // Align items to the right
  flex-grow: 1;  // Allow it to take up all available space
`;

const StyledNavLink = styled(RouterNavLink)`
  margin-left: 20px;  // Space between links
  color: white;
  text-decoration: none;

  &.active {  // Style for the active link
    font-weight: bold;
  }
`;

const base = new Airtable({ apiKey: process.env.ROADMAP_APP_AIRTABLE_KEY }).base('app86LcWij0hDTXST');

function filterInProgress() {
  return "{Status} = 'In Progress'";
}

function filterComingNext() {
  return "{Status} = 'Coming Next'";
}

function filterCompleted() {
  return "{Status} = 'Completed'";
}

const fetchFeaturesFromAirtable = (filterFormula) => {
  return new Promise((resolve, reject) => {
    base('features').select({
      filterByFormula: filterFormula
    }).firstPage((err, records) => {
      if (err) {
        reject(err);
        return;
      }
      const features = records.map(record => ({
        id: record.id,
        title: record.get('Title'),
        description: record.get('Description'),
        epic: record.get('Epic'),
        status: record.get('Status')
      }));
      resolve(features);
    });
  });
};

const config = {
  target: "svg"
};

function App() {
  // const [user, setUser] = useState(null);

  const [inProgressFeatures, setInProgressFeatures] = useState([]);
  const [comingNextFeatures, setComingNextFeatures] = useState([]);
  const [completedFeatures, setCompletedFeatures] = useState([]);
  const [features, setFeatures] = useState([]); // [inProgressFeatures, comingNextFeatures, completedFeatures]
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewFeatureModal, setShowNewFeatureModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchFeaturesFromAirtable(filterInProgress()),
      fetchFeaturesFromAirtable(filterComingNext()),
      fetchFeaturesFromAirtable(filterCompleted())
    ])
    .then(([inProgressData, comingNextData, completedData]) => {
      setInProgressFeatures(inProgressData);
      setComingNextFeatures(comingNextData);
      setCompletedFeatures(completedData);
      // should contain all features from inProgressData, comingNextData, and completedData
      setFeatures([...inProgressData, ...comingNextData, ...completedData]);
      setLoading(false);
    })
    .catch(err => {
      setError(`An error occurred: ${err.message}`);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading... </div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <BrowserRouter>
    <TopBarContainer>
      <nav>
      <NavContainer>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/pricing">Pricing</StyledNavLink>
          <StyledNavLink to="/roadmap">Roadmap</StyledNavLink>
          <StyledNavLink to="/milestones">Milestones</StyledNavLink>

      </NavContainer>
      </nav>
    </TopBarContainer>

      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pricing" element={<PricingPage/>} />
        <Route path="/roadmap" element={<RoadmapPage/>} />
        <Route path="/milestones" element={<MilestonePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
