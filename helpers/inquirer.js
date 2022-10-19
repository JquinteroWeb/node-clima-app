const inquirer = require("inquirer");

require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".cyan} Buscar lugar.`,
      },
      {
        value: 2,
        name: `${"2.".cyan} Historial.`,
      },
      {
        value: 0,
        name: `${"0.".cyan} Salir.`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("+++++++++++++++++++++++++".blue);
  console.log("  Seleccione una opción  ".white);
  console.log("+++++++++++++++++++++++++".blue);
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const continuar = [
    {
      type: "input",
      name: "opcion",
      message: "¿Desea continuar? " + `Precione ${"enter.".blue}`,
    },
  ];
  await inquirer.prompt(continuar);
};

const leerInput = async (mensaje) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: mensaje,
      validate(value) {
        if (value.length === 0) {
          return "Favor ingresar un valor!!";
        } else {
          return true;
        }
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoLugares = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Seleccione el lugar: ",
      choices,
    },
  ];
  const { id }  = await inquirer.prompt(preguntas);
  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.des}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

const confirmar = async (mensaje) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      mensaje,
    },
  ];
  ok = await inquirer.prompt(pregunta);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoLugares,
  confirmar,
  mostrarListadoChecklist,
};
