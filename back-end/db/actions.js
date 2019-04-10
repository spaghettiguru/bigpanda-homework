const config = require('../config')
const MongoClient = require('mongodb').MongoClient

    async function fetchAll() {
        let dbClientInstance;
        let comments = null
        try {
            dbClientInstance = await MongoClient.connect(config.dbServerURL)
            console.log("Connected successfully to MongoDB server")
            const db = dbClientInstance.db(config.dbName)
            const commentsCollection = db.collection('comments')

            try {
                comments = await commentsCollection.find({}).toArray()
            } catch(error) {
                console.error('[ERROR] Failed to convert cursor to array. Got error: ', error)
            }
        } catch (error) {
            console.error('[ERROR] Failed to connect to the database. Got error: ', error)
        } finally {
            if (dbClientInstance) {
                dbClientInstance.close()
            }
            
            return comments
        }
    }

    async function fetchByEmail(email) {

    }

    function insertSingle(comment) {}

module.exports = {fetchAll, fetchByEmail, insertSingle}