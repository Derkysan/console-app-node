require('colors');

const displayMenu = () => {

  return new Promise( (resolve, reject) => {

    console.clear();
    console.log('=========================='.green);
    console.log(' Seleccione una opcion'.green);
    console.log('==========================\n'.green);

    console.log(`${ '1.'.green } Crear tarea`);
    console.log(`${ '2.'.green } Listar tareas`);
    console.log(`${ '3.'.green } Listar tareas completadas`);
    console.log(`${ '4.'.green } Listar tareas pendientes`);
    console.log(`${ '5.'.green } Completar tarea(s)`);
    console.log(`${ '6.'.green } Borrar tareas`);
    console.log(`${ '0.'.green } Salir\n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
      resolve(opt)
      readline.close();
    })

  })


}

const pause = () => {

  return new Promise( (resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    readline.question(`Presione ${'Enter'.green} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    })
  })

}

module.exports = {
  displayMenu,
  pause
}