const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users'
        }

        this.connectToDB();

        this.middlewares();

        this.routes();
    }

    async connectToDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.users, require('../routes/users'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port', this.port );
        });
    }

}




module.exports = Server;
