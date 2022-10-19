const axios = require("axios");

class Busquedas {
  historial = [];
  constructor() {
    //LEER DB SI EXISTE
  }
  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeather(){
    return {     
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    }
  }

  async buscarLugar(lugar = "") {
    try {
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapBox,
      });

      const res = await intance.get();

      return res.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name_es,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async buscarTemp(lat = "", lon = "") {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {...this.paramsOpenWeather,lat,lon}
      });

      const resp = await instance.get();
      const {main,weather} = resp.data;

      return {
        Desc: weather[0].description,
        Min: main.temp_min,
        Max: main.temp_max,
        Temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
