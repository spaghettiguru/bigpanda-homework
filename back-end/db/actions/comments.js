const MongoClient = require('mongodb').MongoClient

const config = require('../../config')
const dbUtils = require('../utils')

async function fetchAll() {
    let comments = null
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection('comments')
    try {
        comments = await commentsCollection.find({}).toArray()
    } catch(error) {
        console.error('[ERROR] Failed to convert cursor to array. Got error: ', error)
    } finally {
        client.close()
    }

    return comments
}

async function fetchByEmail(email) {

}

function insertSingle(comment) {}

module.exports = {fetchAll, fetchByEmail, insertSingle}