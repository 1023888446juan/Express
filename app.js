const express = require('express');
const app = express();

require("dotenv/config");

const port = process.env.PUERTO || 3000;

const sistemaArchivo = require("fs");
const ruta = require("path");
const rutaArchivoJson = ruta.join(__dirname, "datos.json");
const multer = require("multer");
const resgistroMiddleware = require("./middleware/registroMiddleware");
app.use(resgistroMiddleware);

// Importar validaciones
const {
    validarNombre,
    validarCorreo,
    generarId
} = require("./utilidades/validaciones");

// Configurar almacenamiento
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "misImagenes/");
    },

    filename: (req, file, cb) => {
        const extensionArchivo = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extensionArchivo}`);
    }
});

const subirArchivo = multer({
    storage: almacenamiento
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use ((req, res, next) => {
  console.log (`tiempo milisegundos: ${Date.now()}`)
  console.log (`fecha: ${new Date().toISOString()}`)
  next()
}); 

// Endpoint raíz
app.get("/", function(req, res) {
    res.send("Hola aprendiendo Express");
})

// Obtener aprendices
app.get("/api/aprendices", (req, res) => {

    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                Error: "No se puede leer los datos."
            });
        }

        const listaAprendices = JSON.parse(datos);

        res.json(listaAprendices);
    });
});

// Crear aprendiz
app.post("/api/aprendices", subirArchivo.single("imagen"), (req, res) => {

    const nuevoAprendiz = req.body;

    // Validar nombre
    if (!validarNombre(nuevoAprendiz.nombre)) {
        return res.status(400).json({
            Error: "El nombre debe tener mínimo 3 letras."
        });
    }

    // Validar correo
    if (!validarCorreo(nuevoAprendiz.correo)) {
        return res.status(400).json({
            Error: "El correo electrónico no es válido."
        });
    }

    // Leer archivo JSON
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos) => {

        if (error) {
            return res.status(500).json({
                Error: "No se puede leer los datos."
            });
        }

        const listaAprendices = JSON.parse(datos);

        // Generar ID automático
        nuevoAprendiz.id = generarId(listaAprendices);

        // Guardar imagen
        nuevoAprendiz.imagen = req.file
            ? `/misImagenes/${req.file.filename}`
            : "sin imagen";

        // Agregar aprendiz
        listaAprendices.push(nuevoAprendiz);

        // Guardar cambios
        sistemaArchivo.writeFile(
            rutaArchivoJson,
            JSON.stringify(listaAprendices, null, 2),
            (error) => {

                if (error) {
                    return res.status(500).json({
                        Error: "No se puede registrar el aprendiz."
                    });
                }

                res.status(201).json({
                    mensaje: "Aprendiz creado con éxito.",
                    aprendiz: nuevoAprendiz
                });
            }
        );
    });
});

// Servidor
app.listen(port, function() {
    console.log(`Servidor http://localhost:${port}`);
});

app.put("/api/aprendices/:id", (req, res) => {
  res.status(200).json({mensaje: "Endpoint para actualizar aprendiz"});
});

app.delete("/api/aprendices/:id", (req, res) => {
  res.status(200).json({mensaje: "Endpoint para eliminar aprendiz"});
});
