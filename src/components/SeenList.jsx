import React from "react";

const SeenList = ({ seen }) => {
  return (
    <div>
      <h2>Displayed characters</h2>
      <br />
      <p> <span className="badge badge-primary badge-pill">{seen.length}</span>
      </p>
      <ul className="list-group">
        {seen.map((item, index) => (
          <a href="#" className="list-group-item list-group-item-action" key={index}>
            {item.name}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default SeenList;
