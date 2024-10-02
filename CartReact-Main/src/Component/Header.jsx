import React from "react";

export default function Header({ items = 0 }) {
  return (
    <>
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">UseReducer</a>
          <div className="row justify-content-start">
            <span style={{ color: "white", fontWeight: "bold" }}>
              {items}  {/* This will display the total number of items */}
            </span>
            <span className="material-symbols-outlined px-5" style={{ color: "white" }}>shopping_cart</span>
          </div>
        </div>
      </nav>
    </>
  );
}
