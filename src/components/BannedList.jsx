import React from "react";

const BannedList = ({ banned }) => {
  return (
    <div>
      <h2>Banned characters</h2>
      <br />
      <ul className="list-group">
        {banned.map((item, index) => (
          <a
            href="#"
            className="list-group-item list-group-item-action"
            key={index}
          >
            {item.name}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default BannedList;
