require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para recibir JSON
app.use(express.json());

// Endpoint 1: saludo estático
app.get('/saludo', (req, res) => {
    res.send('Hola mundo');
});

// Endpoint 2: saludo dinámico
app.get('/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;

    res.json({
        mensaje: `¡Hola, ${nombre}! Bienvenido/a al taller de Express.`
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});