import React, { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './Hero';
import EpicProgress from './EpicProgress';
// import RoadmapSection from './RoadmapSection';
import NewFeature from './NewFeature';
import Airtable from 'airtable';
import saveFeatureToAirtable  from './airtableUtils.js';
import Modal from './Modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FeatureColumn from './FeatureColumn';



const base = new Airtable({ apiKey: 'patXoKE30cfdzGyiY.cd7f900e821b989121d5ae3b697382588064a8330798745c8a406eb98e45c305' }).base('app86LcWij0hDTXST');
// /tblLVbc6orZBh42y3/viwcWZEy7T86jljyr

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

function App() {
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
    <DndProvider backend={HTML5Backend}>

    <div className="App">
      <HeroSection />
      <center>
        <button onClick={() => setIsModalOpen(true)}>Add New Feature</button>
      </center>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewFeature onSave={handleSaveFeature} onClose={() => setIsModalOpen(false)} />
      </Modal>
      <EpicProgress />
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

export default App;