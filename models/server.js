const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        this.middelwares();

        this.routes();
    }

    routes() {
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