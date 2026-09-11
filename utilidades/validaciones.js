// Validar que el nombre tenga mínimo 3 letras
function validarNombre(nombre) {
    return typeof nombre === "string" && nombre.trim().length >= 3;
}

// Validar correo electrónico
function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}

// Generar ID automático
function generarId(lista) {
    if (lista.length === 0) {
        return 1;
    }

    return Math.max(...lista.map(aprendiz => Number(aprendiz.id))) + 1;
}

module.exports = {
    validarNombre,
    validarCorreo,
    generarId
};