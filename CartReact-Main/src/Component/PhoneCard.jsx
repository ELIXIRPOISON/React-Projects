import React from 'react';
import './PhoneCard.css';

export default function PhoneCard({ img, name, price, items, increaseItems, decreaseItems, removeItem }) {
  return (
    <>
      <div className="containerCard">
        <div className="left">
          <img src={img} className="img" alt="" style={{ height: '100px' }} />
          <div className="details">
            <h3>{name}</h3>
            <span>${price}</span>
            <button id="remove" onClick={removeItem}>Remove</button> {/* Call removeItem on click */}
          </div>
        </div>
        <div className="right">
          <button onClick={increaseItems}>+</button>
          {items}
          <button onClick={decreaseItems}>-</button>
        </div>
      </div>
    </>
  );
}
