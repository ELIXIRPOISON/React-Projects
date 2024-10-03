import React, { useState } from 'react';
import './AddGrocery.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddGrocery() {
  const [value, setValue] = useState('');  
  const [items, setItems] = useState([]);  


  const setValueName = (e) => {
    setValue(e.target.value);
  };

  const addItem = () => {
    if (value) {
      setItems([...items, value]);
      setValue('');
    }
    toast.success(` Added ${value}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <>
    <div className="amin">
      <div className="GroceryCOntainer">
            <h2>Grocery Bud</h2>
            <div id='inner'>
            <input
                type="text"
                placeholder='Add Items'
                id='Input'
                value={value}  // Controlled input
                onChange={setValueName} />
            <button id='button' onClick={addItem}>Add Item</button>
            </div>
      </div>
      <br /><br />
      <div className="itemCont">
        {items.map((item, index) => (
          <div key={index} className="item">
            <span>{item}</span>
            <button className="del" onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    <ToastContainer/>
    </>
  );
}
