import React, { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './Hero';
import NewFeature from './NewFeature';
import Airtable from 'airtable';
import Modal from './Modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeatureColumn from './FeatureColumn';
import { updateFeatureInAirtable } from './airtableUtils.js';
import saveFeatureToAirtable  from './airtableUtils.js';
import data from "./data/kes.js";

import Chart from './HillChart.js';


const base = new Airtable({ apiKey: 'patXoKE30cfdzGyiY.cd7f900e821b989121d5ae3b697382588064a8330798745c8a406eb98e45c305' }).base('app86LcWij0hDTXST');


// const data = [
//   { x: 10, color: 'red', size: 5, description: 'Task 1' },
//   { x: 40, color: 'blue', size: 7, description: 'Task 2' },
//   { x: 70, color: 'green', size: 10, description: 'Task 3' },];

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

function RoadmapPage() {
  // const [user, setUser] = useState(null);

  const [inProgressFeatures, setInProgressFeatures] = useState([]);
  const [comingNextFeatures, setComingNextFeatures] = useState([]);
  const [completedFeatures, setCompletedFeatures] = useState([]);
  const [features, setFeatures] = useState([]); // [inProgressFeatures, comingNextFeatures, completedFeatures]
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNewFeatureModal, setShowNewFeatureModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (featureId, newStatus) => {
    const updatedFeatures = features.map((feature) => {
      if (feature.id === featureId) {
        return { ...feature, status: newStatus };
      }
      return feature;
    });
    setFeatures(updatedFeatures);

    // Update Airtable here. If there's an error, show the snackbar and retry.
    updateFeatureInAirtable(featureId, newStatus)
  };

  const handleSaveFeature = async (feature) => {
    try {
      await saveFeatureToAirtable(feature);
      alert('Feature saved successfully!');
      setIsModalOpen(false); // Close the modal after successful save

    } catch (error) {
      alert('Error saving feature: ' + error.message);
    }
  };


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

    <DndProvider backend={HTML5Backend}>

    <div className="App">
      
      <HeroSection />

      {/* <center>
        <button onClick={() => setIsModalOpen(true)}>Add New Feature</button>
      </center> */}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewFeature onSave={handleSaveFeature} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <div className="chart-container">
        <Chart  data={data} />
      </div>
   
      <div className="columns-container">
        {['Coming Next', 'In Progress', 'Completed'].map((status) => (
          <FeatureColumn 
            key={status} 
            status={status} 
            features={features.filter(feature => feature.status === status)} 
            onDrop={handleDrop} 
          />
        ))}
      </div>
    </div>

    </DndProvider>

  );
}

export default RoadmapPage;