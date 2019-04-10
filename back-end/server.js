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

    // const commentsMock = [
    //     {userID: 'yuzvik.oleg@gmail.com', text: 'No comments.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
    //     {userID: 'john.doe@mail.ru', text: 'There is a very long comment here.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
    //     {userID: 'fakemail@fake.com', text: 'My email is fake, so is this comment.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
    // ]
    let commentsToReturn;
    if (email) {
        commentsToReturn = await commentsActions.fetchByEmail(email);
    } else {
        commentsToReturn = await commentsActions.fetchAll();
    }

    res.send(commentsToReturn)
})

app.post('/', async (req, res) => {
    console.log('\nIncoming request with the following params: \n METHOD: %s\n URL: %s\n', req.method, req.url)

    const createdComment = await commentsActions.insertSingle(req.body)

    res.send(createdComment);
})

app.listen(config.httpServerPort, () => console.log(`Comments service is listening on port ${config.httpServerPort}!`))

