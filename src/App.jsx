// App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import APIForm from "./components/APIForm";
import "bootstrap/dist/css/bootstrap.min.css";
import BannedList from "./components/BannedList";
import SeenList from "./components/SeenList";
import ImageComponent from "./components/ImageComponent";
import myJson from "./components/data.json";
import "./App.css"; // Importa tu archivo CSS

function App() {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState(null);

  const [bannedList, setBannedList] = useState([]);
  const [seenList, setSeenList] = useState([]);

  const fetchDataFromMarvelAPI = async () => {
    try {
      const response = await axios.get(
        "https://gateway.marvel.com:443/v1/public/characters",
        {
          params: {
            limit: 10,
            offset: 200,
            apikey: import.meta.env.VITE_APP_ACCESS_KEY,
          },
        }
      );
      console.log("Data from Marvel API:", response.data);
      setCharacters(response.data.data.results);
    } catch (error) {
      console.error("Error fetching data from Marvel API:", error);
    }
  };

  const submitForm = async () => {
    await makeQuery();
  };

  const makeQuery = async () => {
    try {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setCharacter(characters[randomIndex]);
      addToSeenList(characters[randomIndex]);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  const addToSeenList = (character) => {
    if (character) {
      setSeenList([...seenList, character]);
    }
  };

  const addToBannedList = ({ id, name }) => {
    const updatedBannedList = [...bannedList, { id, name }];
    setBannedList(updatedBannedList);
    const updatedCharacters = characters.filter((char) => char.id !== id);
    setCharacters(updatedCharacters);
  };

  useEffect(() => {
    if (characters.length === 0) {
      fetchDataFromMarvelAPI(); // Hacer la primera llamada al cargar la página
    } else {
      makeQuery(); // Utilizar los datos en memoria
    }
  }, []); // Solo se ejecutará una vez al montar el componente

  return (
    <>
      {/* Banner de encabezado con imagen de fondo */}
      <header className="banner"></header>

      <div className="container">
        <div className="row">
          <div className="col-2">
            <SeenList seen={seenList} />
          </div>
          <div className="col-8">
            <APIForm onSubmit={submitForm} />
            {character && (
              <ImageComponent
                character={character}
                addToBannedList={addToBannedList}
              />
            )}
          </div>
          <div className="col-2">
            <BannedList banned={bannedList} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
