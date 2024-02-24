import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setwDetails] = useState();
  const [isLoading, setIsLoading] = useState(false)

  const getData = (event) => {
    setIsLoading(true)
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd1f7d070a0f0bed4f37ac8b1b98bb33&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if(finalRes.cod == "404"){
          setwDetails(undefined)
        }
        else{
          setwDetails(finalRes)
        }

        setIsLoading(false)
        
      });

    event.preventDefault();
    setCity("");
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-[40px] font-bold text-white">Simple Weather App</h1>

        <form onSubmit={getData}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[300px] h-[40px] pl-3"
            placeholder="Enter City"
          />
          <button className="bg-blue-800 border-black m-4 p-3 font-bold text-white">
            Submit
          </button>
        </form>

        <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative">

        <img src="https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif" width={100} className={`absolute left-[40%] ${isLoading ? '' : 'hidden'}`}/>

        {
          wDetails !== undefined
          ?
          <>
          <h3 className="font-bold text-[30px]">
          {wDetails.name} <span className="bg-[yellow]">{wDetails.sys.country}</span>
          </h3>
          <h2 className="font-bold text-[40px]">{wDetails.main.temp}</h2>
          <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} />
          <p>{wDetails.weather[0].description}</p>
          </>
          : 
          "No Data"
        }
          
        </div>
      </div>
    </div>
  );
}

export default App;
