const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios.controller');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);     

router.put('/:id', [
    check('id', 'NO es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
 usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), // Se comenta para validar desde la DB
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'NO es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);


module.exports = router;