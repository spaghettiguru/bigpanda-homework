const MongoClient = require('mongodb').MongoClient

const config = require('../../config')
const dbUtils = require('../utils')

const COLLECTION_NAME = 'comments'

async function fetchAll() {
    let comments
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection(COLLECTION_NAME)

    try {
        let commentsCursor
        try {
            commentsCursor = await commentsCollection.find({})
        } catch(error) {
            console.error('DB find operation failed with the following error: ', error)
            throw error
        }

        try {
            comments = commentsCursor.toArray()
        } catch(error) {
            console.error('Failed to convert cursor to array. Got error: ', error)
            throw error
        }
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
        let commentsCursor
        try {
            commentsCursor = await commentsCollection.find({email})
        } catch(error) {
            console.error('DB find operation failed with the following error: ', error)
            throw error
        }

        try {
            comments = commentsCursor.toArray()
        } catch(error) {
            console.error('Failed to convert cursor to array. Got error: ', error)
            throw error
        }
    } finally {
        client.close()
    }

    return comments
}

async function insertSingle(comment) {
    let createdComment
    const {db, client} = await dbUtils.connectToDB()
    const commentsCollection = db.collection(COLLECTION_NAME)
    try {
        createdComment = await commentsCollection.insertOne(comment)
    } catch(error) {
        console.error('Failed to insert document %s into %s collection. \nDB return the following error: %s', 
            comment, 
            COLLECTION_NAME,
            error)
            throw error
    } finally {
        client.close()
    }

    return createdComment
}

module.exports = {fetchAll, fetchByEmail, insertSingle}