import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newHours, setNewHours] = useState('');

  // Load subjects and hours from local storage
  const savedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
  if (savedSubjects.length > 0 && subjects.length === 0) {
    setSubjects(savedSubjects);
  }

  const addSubject = () => {
    if (newSubject && newHours) {
      const updatedSubjects = [...subjects, { subject: newSubject, hours: parseInt(newHours) }];
      setSubjects(updatedSubjects);
      setNewSubject('');
      setNewHours('');

      // Update local storage
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  const increaseHours = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += 1;
    setSubjects(updatedSubjects);

    // Update local storage
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  const decreaseHours = (index) => {
    const updatedSubjects = [...subjects];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubjects(updatedSubjects);

      // Update local storage
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="App p-4">
        <h1 className="text-2xl mb-4">Geekster Education Planner</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="border rounded py-1 px-2 mr-2"
          />
          <input
            type="number"
            placeholder="Hours"
            value={newHours}
            onChange={(e) => setNewHours(e.target.value)}
            className="border rounded py-1 px-2 mr-2 w-16"
          />
          <button onClick={addSubject} className="bg-blue-500 text-white py-1 px-2 rounded">Add</button>
        </div>
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="mr-2">{subject.subject} - {subject.hours} hours</div>
            <button onClick={() => increaseHours(index)} className="bg-green-500 text-white py-1 px-2 rounded mr-2">+</button>
            <button onClick={() => decreaseHours(index)} className="bg-red-500 text-white py-1 px-2 rounded">-</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
