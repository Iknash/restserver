const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
      const roleExists = await Role.findOne({ role });
      if ( !roleExists ){
          throw new Error(`El rol ${ role } no está registrado en la DB`);
      }
}

// Verificar si el correo existe
const emailChecker = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ){
        throw new Error(`El correo ${ email } ya está registrado en la DB`);
    }
}

const userByIdChecker = async ( id ) => {
    idExists = await User.findById(id);
    if ( !idExists ){
        throw new Error (`La ID ${ id } no está registrada en la DB`);
    }
}

module.exports = {
    isRoleValid,
    emailChecker,
    userByIdChecker
}
