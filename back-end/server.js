const crypto = require('crypto')

const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')

const config = require('./config')
const commentsActions = require('./db/actions/comments')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    console.log('\nIncoming request with the following params: \n METHOD: %s\n URL: %s\n', req.method, req.url)
    const email = req.query.email

    let commentsToReturn
    if (email) {
        commentsToReturn = await commentsActions.fetchByEmail(email)
    } else {
        commentsToReturn = await commentsActions.fetchAll()
    }

    // this is here for demo purposes only - to show that loaders work properly in UI
    setTimeout(() => res.send(commentsToReturn), 1000)
})

app.post('/', async (req, res) => {
    console.log('\nIncoming request with the following params: \n METHOD: %s\n URL: %s\n BODY: %s\n', 
        req.method, req.url, JSON.stringify(req.body))

    const commentToInsert = req.body

    // add Gravatar URL to the comment object before inserting it to the db
    const emailHash = crypto
                            .createHash('md5')
                            .update(commentToInsert.email.trim().toLowerCase())
                            .digest("hex")
    commentToInsert.userPicURL = 'https://www.gravatar.com/avatar/' + emailHash

    const insertedComment = (await commentsActions.insertSingle(commentToInsert)).ops[0]

    // this is here for demo purposes only - to show that loaders work properly in UI
    setTimeout(() => res.send(insertedComment))
})

app.listen(config.httpServerPort, () => console.log(`Comments service is listening on port ${config.httpServerPort}!`))

