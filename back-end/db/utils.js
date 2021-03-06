const MongoClient = require('mongodb').MongoClient
const config = require('../config')

async function connectToDB() {
    let client;
    let db;

    try {
        client = await MongoClient.connect(config.dbServerURL, { useNewUrlParser: true })
        console.log("Connected successfully to MongoDB server")
        db = client.db(config.dbName)
    } catch (error) {
        console.error('Failed to connect to the database. Got error: ', error)
        throw error
    }

    return {db, client}
}

module.exports = {connectToDB}