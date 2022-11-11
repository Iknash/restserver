const { Router } = require('express');
const { check } = require('express-validator');

// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, hasRole } = require('../middlewares/validate-roles');
// const { validarCampos } = require('../middlewares/validar-campos');
const {
    validateJWT,
    isAdminRole,
    hasRole,
    validarCampos
} = require('../middlewares');

const { isRoleValid, emailChecker, userByIdChecker } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( userByIdChecker ),
  check('role').custom( isRoleValid ),
  validarCampos
], usuariosPut );

router.post('/',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail(),
  check('email').custom( emailChecker ),
  // check('role', 'El rol ingresado no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom( isRoleValid ),
  validarCampos
], usuariosPost );

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  // hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( userByIdChecker ),
  validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;
