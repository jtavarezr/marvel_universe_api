import { useState } from 'react'
import './App.css'
import APIForm from './components/APIForm'
import Gallery from './components/Gallery'
import "bootstrap/dist/css/bootstrap.min.css";
import BannedList from './components/BannedList';
import SeenList from './components/SeenList';


function App() {

  const [currentImage, setCurrentImage] = useState(null);
  const [seenList, setSeenList] = useState([]);
  const [bannedList, setBannedList] = useState([]);

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
    photos:  ""
  });  

  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
  const MARVEL_PUK = import.meta.env.MARVEL_PRIVATE_KEY;

  const submitForm = () => {
    console.log("Cliqueado")
    makeQuery()
  }
  const makeQuery = () => {
    let earth_date = "2024-1-21";
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query_old = `https://gateway.marvel.com:443/v1/public/characters?apikey=${ACCESS_KEY}`;
    let query = `https://gateway.marvel.com:443/v1/public/comics?apikey=bb4f2d565ff24d4afcb6e90d1589b6b5`;
    callAPI2(query).catch(console.error);
  };
  const makeQueryMarver = () => {
    let earth_date = "2024-1-21";
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${earth_date}&api_key=${ACCESS_KEY}`;
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    console.log(json.data.results[15]);
    //console.log(json.photos[0].img_src);

    if (json.data == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setCurrentImage(
        json.data.results[15].images + json.data.results[15].images[0]);
    }
  };

  const callAPI2 = async (query) => {
  
    const response = await fetch(query);
    const json = await response.json();

    console.log(json.data.results);
   
  } 
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <h3>NASA Image V</h3>
          <div className="col-2">
            <SeenList seen={seenList} />
          </div>

          <div className="col-6">
            {" "}
            <APIForm onSubmit={submitForm} />
          </div>

          <div className="col-2">
            <BannedList banned={bannedList} />
          </div>
        </div>
      </div>
      {currentImage ? (
        <img
          className="screenshot"
          src={currentImage}
          alt="Screenshot returned"
        />
      ) : (
        <div> </div>
      )}
      <Gallery />
    </>
  );
}

export default App
