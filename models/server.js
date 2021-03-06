const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        this.middelwares();

        this.conectarDB();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuariosPath, require('../routes/user.routes'))
    }

    middelwares() {
        // CORS 
        this.app.use(cors());

        // Lectura y parceo del body
        this.app.use(express.json())
    
        // Directorio público
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en port:', this.port);
        })
    }
}


module.exports = Server;