import React, { useReducer } from 'react';
import './App.css';

const employees = [
  { id: 1, first_name: 'Chirag', last_name: 'Kapil', age: 80 },
  { id: 2, first_name: 'Ankit', last_name: 'Kumar', age: 29 },
  { id: 3, first_name: 'Archit', last_name: 'Raj', age: 69 },
  { id: 4, first_name: 'Aryan', last_name: 'Singh', age: 31 },
  { id: 5, first_name: 'Navaneet', last_name: 'Rai', age: 32 },
];

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        team: [...state.team, action.payload],
        disabledEmployees: [...state.disabledEmployees, action.payload.id],
      };
    case 'REMOVE_EMPLOYEE':
      return {
        ...state,
        team: state.team.filter((employee) => employee.id !== action.payload.id),
        disabledEmployees: state.disabledEmployees.filter(
          (id) => id !== action.payload.id
        ),
      };
    case 'SORT_TEAM':
      return {
        ...state,
        team: [...state.team].sort((a, b) => a.age - b.age),
      };
    default:
      return state;
  }
};

// Define the initial state
const initialState = {
  team: [],
  disabledEmployees: [],
};

const EmployeesComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addEmployee = (employee) => {
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };

  const removeEmployee = (employee) => {
    dispatch({ type: 'REMOVE_EMPLOYEE', payload: employee });
  };

  const sortTeamByAge = () => {
    dispatch({ type: 'SORT_TEAM' });
  };

  const calculateAverageAge = () => {
    if (state.team.length === 0) return 0;
    const totalAge = state.team.reduce((total, employee) => total + employee.age, 0);
    return (totalAge / state.team.length).toFixed(2);
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <li
              key={employee.id}
              className={`employee-item ${state.disabledEmployees.includes(employee.id) ? 'disabled' : ''}`}
            >
              <div className="employee-info">
                {employee.first_name} {employee.last_name}, Age: {employee.age}
              </div>
              {!state.disabledEmployees.includes(employee.id) && (
                <button onClick={() => addEmployee(employee)} className="add-btn">ADD</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="box">
        <h2>Team Members</h2>
        <button className="sort-btn" onClick={sortTeamByAge}>SORT BY AGE</button>
        <ul>
          {state.team.map((employee) => (
            <li key={employee.id} className="team-member-item">
              <div className="employee-info">
                {employee.first_name} {employee.last_name}, Age: {employee.age}
              </div>
              <button onClick={() => removeEmployee(employee)} className="remove-btn">REMOVE</button>
            </li>
          ))}
        </ul>
        <p>Average Age: {calculateAverageAge()}</p>
      </div>
    </div>
  );
};

export default EmployeesComponent;
