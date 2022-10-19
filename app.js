require("dotenv").config();
const {
  leerInput,
  inquirerMenu,
  pausa,
  listadoLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
const main = async () => {
  const busqueda = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const lugar = await leerInput("Ingrese el lugar: ");

        const lugares = await busqueda.buscarLugar(lugar);
       

        //Seleccionar lugar
        const id = await listadoLugares(lugares);
        

        //Lugar seleccionado
        const lugarSeleccionado = lugares.find(lugar => lugar.id = id);

       
        //Buscar clima

        const clima = await busqueda.buscarTemp(lugarSeleccionado.lat,lugarSeleccionado.lng);

        //Mostar resultados

        console.log("\nInformación de la ciudad:".green);
        console.log("Ciudad: ".red,lugarSeleccionado.nombre);
        console.log("Latitud: ".red,lugarSeleccionado.lat);
        console.log("Longitud: ".red,lugarSeleccionado.lng);
        console.log("Temperatura minima: ".red,clima.Min);
        console.log("Temperatura maxima: ".red,clima.Max);
        console.log("Temperatura: ".red,clima.Temp);
        console.log("Descripción: ".red,clima.Desc);
        
        case 2:
    }

    if (opt != 0) await pausa();
  } while (opt != 0);

  console.log("+++=========Salio========+++");
};
main();
