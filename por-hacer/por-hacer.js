const fs = require('fs');
const { setFlagsFromString } = require('v8');
const { number } = require('yargs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer); // Convierte un objeto en un JSON

    // Grabamos en el archivo JSON
    fs.writeFile('DB/data.json', data, (error) => {
        if (error) {
            throw new Error('No se puedo grabar', error);
        }
    });
}

const crear = (descripcion) => {
    // Primero cargamos los datos
    cargaDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const cargaDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const getListado = (filtro) => {
    cargaDB();
    let listadoFiltrado = listadoPorHacer.filter(tarea => {
        return tarea.completado === Boolean(filtro);
    });
    return listadoFiltrado;
}

const actualizar = (descripcion, completado) => {
    cargaDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargaDB();
    let letNuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (listadoPorHacer.length === letNuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = letNuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}