import React, { useState } from 'react';
import './AddPerson.css'; // Importing the updated CSS

const AddPerson = () => {
  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem('people');
    return savedPeople ? JSON.parse(savedPeople) : [];
  });

  const [person, setPerson] = useState({
    name: '',
    dob: '',
    aadhar: '',
    mobile: '',
    age: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      calculateAge(value);
    }
    setPerson((prevPerson) => ({
      ...prevPerson,
      [name]: value,
    }));
  };

  const calculateAge = (dob) => {
    if (dob) {
      const birthDate = new Date(dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setPerson((prevPerson) => ({
        ...prevPerson,
        age,
      }));
    }
  };

  const handleAddPerson = () => {
    if (
      person.name &&
      person.dob &&
      person.aadhar.length === 12 &&
      person.mobile.length === 10
    ) {
      const updatedPeople = [...people, person];
      setPeople(updatedPeople);
      localStorage.setItem('people', JSON.stringify(updatedPeople));
      setPerson({
        name: '',
        dob: '',
        aadhar: '',
        mobile: '',
        age: '',
      });
    } else {
      alert('Please fill all fields correctly.');
    }
  };

  const handleDeletePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
    localStorage.setItem('people', JSON.stringify(updatedPeople));
  };

  return (
    <div className="add-person">
      {/* Input Fields Section */}
      <div className="input-fields">
        <input
          type="text"
          name="name"
          value={person.name}
          onChange={handleInputChange}
          placeholder="Enter Name"
        />
        <input
          type="date"
          name="dob"
          value={person.dob}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="aadhar"
          value={person.aadhar}
          onChange={handleInputChange}
          placeholder="Enter 12-digit Aadhar"
        />
        <input
          type="text"
          name="mobile"
          value={person.mobile}
          onChange={handleInputChange}
          placeholder="Enter 10-digit Mobile"
        />
        <input
          type="text"
          name="age"
          value={person.age}
          disabled
        />
        <button className="btn-grad" onClick={handleAddPerson}>Save</button>
      </div>

      {/* Table Section */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Aadhar Number</th>
            <th>Mobile Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.dob}</td>
              <td>{person.aadhar}</td>
              <td>{person.mobile}</td>
              <td>{person.age}</td>
              <td>
                <button onClick={() => handleDeletePerson(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPerson;
