const MongoClient = require('mongodb').MongoClient

const config = require('../../config')
const dbUtils = require('../utils')

const COLLECTION_NAME = 'comments'

async function fetchAll() {
    let comments = null
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection(COLLECTION_NAME)
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
    let comments
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection(COLLECTION_NAME)
    try {
        comments = await commentsCollection.find({email}).toArray()
    } catch(error) {
        console.error('[ERROR] Failed to convert cursor to array. Got error: ', error)
    } finally {
        client.close()
    }

    return comments
}

async function insertSingle(comment) {
    let comment
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection(COLLECTION_NAME)
    try {
        comment = await commentsCollection.insertOne(comment)
    } catch(error) {
        console.error('[ERROR] Failed to insert document %s into %s collection', comment, COLLECTION_NAME)
    } finally {
        client.close()
    }

    return comment
}

module.exports = {fetchAll, fetchByEmail, insertSingle}