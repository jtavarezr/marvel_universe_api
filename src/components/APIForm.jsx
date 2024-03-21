import ImageComponent from "./ImageComponent";

const APIForm = ({ character, handleChange, onSubmit }) => {
  return (
    <div>
      <button type="submit" className="button" onClick={onSubmit}>
        Discover! 🎞
      </button>
      <form className="form-container">

        <div className="App">
          {character && (
              <div>
              <h1>OK</h1>
              <h2>{character.name}</h2>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                />
            </div>
          )}
          {character && <ImageComponent character={character} />}
        </div>
      </form>
    </div>
  );
};

export default APIForm;