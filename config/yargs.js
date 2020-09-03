const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de una tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente una tarea'
}

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea por hacer', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra una tarea de la BBDD', {
        descripcion
    })
    .command('listar', 'Lista todas las tareas filtrando por completado o no completado', {
        filtro: {
            demand: true,
            alias: 'f',
            desc: 'Lista las tareas filtrandola'
        }
    })
    .help('')
    .argv;

module.exports = {
    argv
}