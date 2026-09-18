const manegadorErrores = (error, req, res, next) => {

const codigoError=error.statusCode|| 500;
const mensajeError=error.message|| "Error interno del servidor"


//mostrar por consola
console.error(`[Manejador Errores] - ${new Date().toISOString} - ${codigoError} - ${mensajeError}`)
//validar mas mensajes de error, detalles 
if(error.stack){
    console.error(error.stack)
}
//mensaje para el usuario normal
res.json({Error: "ManejadirErrores", 
    codigoError, 
    mensajeError,
    //validar .env si estamos en desarrollo o produccion
    ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    })
}

module.exports = manegadorErrores