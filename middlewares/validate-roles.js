const { response } = require('express');

const isAdminRole = ( req, res = response, next ) => {

    const { role, name } = req.usuario;

    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol salteándose la validación del token'
        });
    }

    if ( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name } no es administrador - no puede realizar esta acción`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol salteándose la validación del token'
        });
    }

    if ( !roles.includes( req.usuario.role ) ){
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${ roles }`
        });
    }

        next(); 
    }
}

module.exports = {
    isAdminRole,
    hasRole
}
