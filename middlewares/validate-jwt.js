const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validateJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No se encontró un token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await Usuario.findById( uid );

        // Verificar si el usuario existe
        if ( !usuario ){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        // Verificar si el usuario está habilitado
        if ( !usuario.status ){
            return res.status(401).json({
                msg: 'Token no válido'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validateJWT
}
