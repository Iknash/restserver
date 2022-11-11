const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateJWT,
    isAdminRole,
    hasRole,
    validateFields
} = require('../middlewares');

const { isRoleValid, emailChecker, userByIdChecker } = require('../helpers/db-validators');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');

const router = Router();


router.get('/', usersGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userByIdChecker ),
    check('role').custom( isRoleValid ),
    validateFields
], usersPut );

router.post('/',[
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailChecker ),
    // check('role', 'El rol ingresado no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
], usersPost );

router.delete('/:id',[
    validateJWT,
    isAdminRole,
    // hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userByIdChecker ),
    validateFields
], usersDelete );

router.patch('/', usersPatch );

module.exports = router;
