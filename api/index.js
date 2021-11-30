const {server} = require('./app');
const mongoose = require('mongoose');
const { userDatabase, password} = require('./config.env/index');

require('dotenv').config();

//Me conecto a la base de datos
const uri = "mongodb+srv://Tito:titoelbanbino@cluster0.khboe.mongodb.net/midleware"
mongoose.connect(`mongodb+srv://${userDatabase}:${password}@cluster0.khboe.mongodb.net/midleware`);

mongoose.connection.once('open', _ => {
    
    console.log('Database is connected');

    server.listen(process.env.PORT, () => {
        console.log(`Listening in http://localhost:${process.env.PORT}` );
    });
})

mongoose.connection.on('error', err => {
    console.log(err)
})

