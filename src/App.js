import React, { useState, useEffect } from 'react';
import { syncData } from './sync';

const App = () => {
  const [households, setHouseholds] = useState([]);
  const [syncStatus, setSyncStatus] = useState('Not synced');

  useEffect(() => {
    // Load local data (simulated offline storage)
    const savedHouseholds = JSON.parse(localStorage.getItem('households') || '[]');
    setHouseholds(savedHouseholds);
  }, []);

  const enrollHousehold = (household) => {
    const updatedHouseholds = [...households, household];
    setHouseholds(updatedHouseholds);
    localStorage.setItem('households', JSON.stringify(updatedHouseholds));
  };

  const followUp = (householdId) => {
    const updatedHouseholds = households.map((household) =>
      household.id === householdId ? { ...household, followedUp: true } : household
    );
    setHouseholds(updatedHouseholds);
    localStorage.setItem('households', JSON.stringify(updatedHouseholds));
  };

  const handleSync = async () => {
    setSyncStatus('Syncing...');
    try {
      await syncData(households);
      setSyncStatus('Sync complete');
    } catch (error) {
      setSyncStatus('Sync failed');
    }
  };

  return (
    <div>
      <h1>WONA - Malaria Data App</h1>
      <h3>Households enrolled: {households.length}</h3>
      <button onClick={handleSync}>Sync Now</button>
      <p>Sync Status: {syncStatus}</p>
      <h2>Enroll New Household</h2>
      <button
        onClick={() =>
          enrollHousehold({ id: Date.now(), name: 'Household ' + (households.length + 1), followedUp: false })
        }
      >
        Add Household
      </button>
      <h2>Enrolled Households</h2>
      <ul>
        {households.map((household) => (
          <li key={household.id}>
            {household.name} - {household.followedUp ? 'Followed up' : 'Pending follow-up'}
            <button onClick={() => followUp(household.id)}>Mark Follow-up</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
