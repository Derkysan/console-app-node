const Todo = require("./todo");
const colors = require('colors');

class Todos {
  
  _list = {}

  get listArr() {

    const list = [];
    Object.keys(this._list).forEach( key => {
      const todo = this._list[key];
      list.push(todo);
    })

    return list;

  }

  constructor() {
    this._list = {}
  }

  readTodosFromDB( todos = [] ) {

    todos.forEach( (todo) => {
      this._list[todo.id] = todo;  
    })

  }

  createTodo(desc = '') {
    const todo = new Todo(desc);  
    this._list[todo.id] = todo;
  }

  showTodosList() {
    this.listArr.forEach( ({ desc, completed }, i) => {
      console.log(`${ colors.green(i + 1 + '.') } ${ desc } :: ${ completed ? 'Completed'.green : 'Pending'.red }`);
    })
  }
  
  listPendigOrCompleted( completedBool = true ) {
    
    let counter = 0;
    this.listArr.forEach( ({ desc, completed }, i) => {
      
      const idx = i + 1;
      
      if (completedBool) {
        if (completed) {
          counter += 1
          console.log(`${(counter + '.').green} ${desc} :: ${ completed }`);
        }
      } else {
        if (!completed) {
          counter += 1
          console.log(`${(counter + '.').green} ${desc} :: ${ 'Pending'.red }`);
        }
      }


    })
    
  }

  deleteTodo( id = '' ) {

    if (this._list[id]) {
      delete this._list[id];
    }

  }

  toggleCompleted( ids = [] ) {

    ids.forEach( id => {

      const todo = this._list[id];
      if (!todo.completed) {
        todo.completed = new Date().toISOString();
      }

    })

    this.listArr.forEach( todo => {

      if (!ids.includes(todo.id)) {
        this._list[todo.id].completed = null
      }

    })

  }
}

module.exports = Todos;