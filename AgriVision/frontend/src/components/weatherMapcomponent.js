import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WeatherMapComponent = () => {
    const [map, setMap] = useState(null);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherInfo, setWeatherInfo] = useState('');

    const apiKey = '0644ac6a93f34b1b874130221242709';

    useEffect(() => {
        // Initialize the map
        const initMap = L.map('map').setView([42.7288, -78.0137], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(initMap);

        // Set the map in state
        setMap(initMap);

        // Event listener for map clicks
        initMap.on('click', function (e) {
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;
            setLatitude(lat.toFixed(6));
            setLongitude(lon.toFixed(6));
            fetchWeatherData(lat, lon);
        });

        return () => {
            initMap.remove();
        };
    }, []);

    const fetchWeatherData = (lat, lon) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const temperature = data.current.temp_c;
                const condition = data.current.condition.text;
                const precipitation = data.current.precip_mm;
                const rainChance = precipitation > 0 ? Math.min((precipitation / 10) * 100, 100) : 0;

                setWeatherInfo(
                    `Temperature: ${temperature}°C, Weather: ${condition}, Rain Chance: ${rainChance.toFixed(2)}%`
                );
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setWeatherInfo('Unable to fetch weather data');
            });
    };

    const searchCity = () => {
        const city = document.getElementById('city').value;
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        const url = `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    map.setView([lat, lon], 13);
                    setLatitude(lat);
                    setLongitude(lon);
                    fetchWeatherData(lat, lon);
                } else {
                    alert('City not found!');
                }
            })
            .catch((error) => {
                console.error('Error fetching city location:', error);
                alert('Unable to fetch city location');
            });
    };

    return (
        <div style={{marginTop:'90px'}}>
            <span style={{textAlign:'center', backgroundColor:'#42DB60',padding:'10px', fontSize:'25px',borderRadius:'10px', position:'relative',left:'30vw',color:'rgb(34, 33, 33)'}}>Farmers' Guide: Weather Information And Map</span>

            <div className="search-container" style={{textAlign:'center',marginTop:'30px'}} >
                <label htmlFor="city" style={{fontWeight:'bolder',fontSize:'22px'}}>Search City:</label>
                <input type="text" id="city" placeholder="Enter city name" style={{fontSize:'21px',height:'40px',paddingLeft:'30px',borderRadius:"20px"}} />
                <button onClick={searchCity} style={{backgroundColor:'#58DB65', fontSize:'18px', marginLeft:'5px', height:'45px'}}>Search</button>
            </div>

            <div id="map" style={{ height: '400px', width: '100%', marginTop: '20px', borderRadius: '10px', border:'1.5px solid black', boxShadow:'2px 2px 2px 2px'}}></div>

            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: '20px',}}>
                <div>
                    <label style={{color:'black'}} >Latitude:</label>
                    <input type="text" value={latitude} readOnly style={{ marginLeft: '10px' }} />
                </div>
                <div>
                    <label style={{color:'black'}}>Longitude:</label>
                    <input type="text" value={longitude} readOnly style={{ marginLeft: '10px' }} />
                </div>
            </div>

            <div style={{padding: '20px', backgroundColor:'#58DB65', borderRadius: '10px', width:'500px', textAlign:'center',marginTop:'50px', marginBottom:'30px', marginLeft:'30vw'}}>
                <h4>Weather Info:</h4>
                <p style={{color:'rgb(34, 33, 33)',fontSize:'22px'}}>{weatherInfo}</p>
            </div>
        </div>
    );
};

export default WeatherMapComponent;
