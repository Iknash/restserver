const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isRoleValid = async (role = '') => {
      const existeRol = await Role.findOne({ role });
      if ( !existeRol ){
          throw new Error(`El rol ${ role } no está registrado en la DB`);
      }
}

// Verificar si el correo existe
const emailChecker = async (email = '') => {
    const emailExists = await Usuario.findOne({ email });
    if ( emailExists ){
        throw new Error(`El correo ${ email } ya está registrado en la DB`);
    }
}

const userByIdChecker = async ( id ) => {
    idExists = await Usuario.findById(id);
    if ( !idExists ){
        throw new Error (`La ID ${ id } no está registrada en la DB`);
    }
}

module.exports = {
    isRoleValid,
    emailChecker,
    userByIdChecker
}
