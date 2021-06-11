const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    // const { q, nombre='No name', api, page='1', limit} = req.query;
    const { limite='5', desde='0' } = req.query;
    const query = { estado: true };
    
    // const usuarios = await Usuario.find()
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.count(query);


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});


    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)
    
    await usuario.save();
    res.json({
        msg: 'Post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    if (password) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)        
    }


    res.json({
        msg: 'Put API - controlador',
        id
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    })
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Delete física
    const usuario = await Usuario.findByIdAndDelete(id);

    res.json({
        id
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}