require('dotenv').config()

module.exports = {
    userDatabase: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
}