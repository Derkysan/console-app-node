const { inquirerMenu, pause, readInput, listDeleteTodo, confirmDelete, completeTodos } = require("./helpers/inquirer");
const { saveFile, readFile } = require("./helpers/saveFile");
const Todos = require("./models/todos");

const main = async () => {

  let opt = '';
  const todos = new Todos();

  const todosDB = readFile();

  if (todosDB) {
    todos.readTodosFromDB(todosDB)
  }
  
  do {

    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        
          const desc = await readInput('Descripción:');
          todos.createTodo(desc)

        break;
      case '2':

          // console.log(todos.listArr);
          todos.showTodosList()

        break;
      case '3':

          todos.listPendigOrCompleted(true)
          
          break;
      case '4':
            
            todos.listPendigOrCompleted(false)

        break;
      
      case '5':
            
            const ids = await completeTodos(todos.listArr);
            todos.toggleCompleted(ids);

        break;


      case '6':
            
            const id = await listDeleteTodo( todos.listArr )
            if (id !== 0) {
              const confirm = await confirmDelete('¿Seguro quieres eliminar la tarea?');
              if (confirm) {
                todos.deleteTodo(id);
                console.log('Tarea borrada!');
              }
            }

        break;
    }

    // saveFile( todos.listArr );

    await pause();
    

  } while ( opt !== '0' );


}

main();