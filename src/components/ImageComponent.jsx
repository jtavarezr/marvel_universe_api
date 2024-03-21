// ImageComponent.jsx
import React from "react";

const ImageComponent = ({ character, addToBannedList }) => {
  return (
    <div className="card">
      <h3>{character.title}</h3>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        className="card-img-top"
        alt={character.name}
      />
      <div className="card-body">
        <div className="card-title">
          <button
            className="btn "
            onClick={() =>
              addToBannedList({ id: character.id, name: character.name })
            }
          >
            {character.name}
          </button>
        </div>
        <div className="card-text">
          <div>
            <div>ID: </div>
            <button
              className="btn btn-primary"
              onClick={() =>
                addToBannedList({ id: character.id, name: character.id })
              }
            >
              {character.id}
            </button>
          </div>
          <p>
            {character.description
              ? character.description
              : "No description available."}
          </p>
          <div>
            Series :
            <ul className="list-group">
              {character.series.items.map((item, index) => (
                <a
                  href="#"
                  className="list-group-item list-group-item-action"
                  key={index}
                  onClick={() =>
                    addToBannedList({ id: character.id, name: item.name })
                  }
                >
                  {item.name}
                </a>
              ))}
            </ul>
          </div>
        </div>
        {/* Agrega aquí cualquier otra información relevante del personaje */}
      </div>
    </div>
  );
};

export default ImageComponent;
