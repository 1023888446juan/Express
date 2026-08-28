//const express = require("express")
import express from 'express';

//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()

const app = express();
const port = process.env.PUERTO || 3030;

//uso de middleware body-parse
app.use(express.json())

app.get("/", (req, res) => {
  res.send(`Aprendiendo express, ficha 3407181, ADSO en el curso de desarrollo web el 31 de julio de 2026`);
});

//otro endpoint
app.get("/otraruta", (req, res) => {
  //usando template string
  res.send(`<h1>Hola desde otra ruta</h1>,
    <h2>end point con res.send</h2>`);
});

app.get("/ruta2", (req, res) => {
  res.json({
    nombre: "Juan Diego",
    apellido: "Castañeda",
    cargo: "Aprendiz",
  });
});


app.get("/ruta3/:aprendiz/:otrodato", (req, res) => {
  const dato_aprendiz = req.params.aprendiz;
  const otro_dato = req.params.otrodato;
  res.json({"nombre":dato_aprendiz, "otro_dato":otro_dato});
});
  

app.get("/ruta4", (req, res) => {
  //capturar la el parametro de consulta query
  const orden = req.query.orden || "sin ordenar";
  const pagina = req.query.pagina || 1;
  res.send(`<h1>listado de aprendices</h1>
    <p>lista de orden ${orden}</p>
    <p>pagina ${pagina}</p>`);
});

//endpoint
app.post("/ruta2", (req, res)=>{
  const todosDatos = req.body
  const name = req.body.nombre
  const lastname = req.body.cargo
  res.status (201).json({Datos: todosDatos, nombre: name, cargo: lastname})
})

app.post("/login/:perfil", (req, res)=>{
    const perfil = req.params.perfil;
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    if (!usuario || !contraseña) {
        return res.status(400).json({
            mensaje: "Faltan datos de usuario o contraseña"
        });
    }

    if (perfil !== "admin" && perfil !== "user") {
        return res.status(404).json({
            mensaje: "Perfil no válido"
        });
    }

    if (perfil === "admin") {
      return res.status(200).json({
        mensaje: "Bienvenido administrador",
        usuario: usuario,
        perfil: "admin"
      });
    }

    return res.status(200).json({
      mensaje: "Bienvenido usuario",
      usuario: usuario,
      perfil: "user"
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      mensaje: "Ruta no encontrada"
    });
  });

app.listen(port, function() {
  console.log(`SERVIDOR: http://localhost:${port}`);
});