const { v4: uuidv4 } = require('uuid');

class Song {
  constructor(name, duracion, autor) {
    this.id = uuidv4();
    this.name = name;
    this.duracion = duracion;
    this.autor = autor;
  }
}

module.exports = Song;