const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Song = require('./Song');
let songs = [
    new Song("Erick2", 2.5, "Erick")
];

// Crear una canción (Create)
app.post('/songs', (req, res) => {
    const { name, duracion, autor } = req.body;
    const song = new Song(name, duracion, autor);
    songs.push(song);
    res.status(201).json(song);
});

// Leer todas las canciones (Read)
app.get('/songs', (req, res) => {
    res.json(songs);
});

// Leer una canción por ID (Read)
app.get('/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === req.params.id);
    if (song) {
        res.json(song);
    } else {
        res.status(404).json({ message: 'Canción no encontrada' });
    }
});

// Actualizar una canción por ID (Update)
app.put('/songs/:id', (req, res) => {
    const { name, duracion, autor } = req.body;
    const index = songs.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
        songs[index] = { id: req.params.id, name, duracion, autor };
        res.json(songs[index]);
    } else {
        res.status(404).json({ message: 'Canción no encontrada' });
    }
});

// Eliminar una canción por ID (Delete)
app.delete('/songs/:id', (req, res) => {
    const index = songs.findIndex(s => s.id === req.params.id);
    if (index !== -1) {
        const deletedSong = songs.splice(index, 1);
        res.json(deletedSong);
    } else {
        res.status(404).json({ message: 'Canción no encontrada' });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
