import React, { useState } from 'react';

function RetrieveInfo() {
  const [aadhar, setAadhar] = useState('');
  const [person, setPerson] = useState(null);

  const handleRetrieve = () => {
    const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
    const foundPerson = storedPeople.find((p) => p.aadhar === aadhar);
    if (foundPerson) {
      setPerson(foundPerson);
    } else {
      setPerson(null);
      alert('No match found');
    }
  };

  return (
    <div className="retrieve-info">
      <input
        type="text"
        placeholder="Enter Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve</button>

      {person ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Aadhar Number</th>
              <th>Mobile Number</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default RetrieveInfo;
