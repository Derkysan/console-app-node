require('colors');
const inquirer = require('inquirer');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1',
        name: `${'1'.green}. Crear tarea`
      },
      {
        value: '2',
        name: `${'2'.green}. Listar tareas`
      },
      {
        value: '3',
        name: `${'3'.green}. Listar tareas completadas`
      },
      {
        value: '4',
        name: `${'4'.green}. Listar tareas pendientes`
      },
      {
        value: '5',
        name: `${'5'.green}. Completar tarea`
      },
      {
        value: '6',
        name: `${'6'.green}. Borrar tarea`
      },
      {
        value: '0',
        name: `${'0'.green}. Salir`
      },
    ]
  }
]

const inquirerMenu = async () => {

  console.clear();
  console.log('=========================='.green);
  console.log(' Seleccione una opcion'.white);
  console.log('==========================\n'.green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion

}

const pause = async () => {

  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `${'enter'.green} para continuar`
    }
  ]
  console.log('\n');
  await inquirer.prompt(question)

}

const readInput = async ( message ) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if (value.length === 0) {
          return 'Por favor, inserte un valor'
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;

}

const listDeleteTodo = async ( todos = []  ) => {

  const choices = todos.map( (todo, i) => {

    const idx = `${i + 1}.`.green;

    return {
      value: todo.id,
      name: `${ (idx) } ${todo.desc}`
    }

  });

  choices.unshift({ value: 0, name: `${ '0.'.green } Salir` });

  const quest = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];

  const { id } = await inquirer.prompt(quest);
  return id;

}

const confirmDelete = async (msg = '') => {

  const quest = {
    type: 'confirm',
    name: 'ok',
    message: msg
  } 

  const { ok } = await inquirer.prompt(quest);
  return ok;
}

const completeTodos = async ( todos = []  ) => {

  const choices = todos.map( (todo, i) => {

    const idx = `${i + 1}.`.green;

    return {
      value: todo.id,
      name: `${ (idx) } ${todo.desc}`,
      checked: todo.completed ? true : false
    }

  });

  const quest = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Completar tareas',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(quest);
  return ids;

}

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTodo,
  confirmDelete,
  completeTodos
}