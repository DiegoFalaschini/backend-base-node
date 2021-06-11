const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log('Base e datos online');
        
    } catch (error) {
        throw new Error('Error al iniciar la DB:', error)
    }

}

module.exports = {
    dbConnection
}