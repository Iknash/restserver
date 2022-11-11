const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    const { limit, from } = req.query;
    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.count(query),
        User.find(query)
            .limit(Number(limit))
            .skip(Number(from))
    ]);

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.json({
        user
    });
}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...eof } = req.body;

    if ( password ){
        const salt = bcryptjs.genSaltSync();
        eof.password = bcryptjs.hashSync ( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, eof );

    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { status: false });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}
