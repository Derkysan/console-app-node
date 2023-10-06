const { v4: uuidv4 } = require('uuid');

class Todo {

  id = '';
  desc = ''
  completed = false

  constructor( desc ) {
    this.id = uuidv4();
    this.desc = desc;
    this.completed = null;
  }
}

module.exports = Todo;