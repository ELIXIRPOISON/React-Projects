import React, { useState } from 'react';
import AddPerson from './components/AddPerson';
import RetrieveInfo from './components/RetrieveInfo';
import './App.css'; // Importing the CSS file

function App() {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="app-container">
      <div className="tabs" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => setActiveTab('add')}>Add New Person</button>
        <button onClick={() => setActiveTab('retrieve')}>Retrieve Information</button>
      </div>
      <div className="tab-content">
        {activeTab === 'add' && <AddPerson />}
        {activeTab === 'retrieve' && <RetrieveInfo />}
      </div>
    </div>
  );
}

export default App;
