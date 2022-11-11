const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limit, from } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        total,
        users
    });
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    // Guardar en DB

    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...eof } = req.body;

    // TODO validar contra base de datos
    if ( password ){
        const salt = bcryptjs.genSaltSync();
        eof.password = bcryptjs.hashSync ( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, eof );

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Se borra completamente el usuario de la DB
    // const usuario = await Usuario.findByIdAndDelete( id );
    
    const usuario = await Usuario.findByIdAndUpdate( id, { status: false });

    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
