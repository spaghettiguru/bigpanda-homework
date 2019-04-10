const express = require('express')
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'myproject';
const client = new MongoClient(url);

client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    client.close();
  });

const app = express()
const PORT = 3001

app.use(cors())

app.get('/', (req, res) => {
    console.log('\nIncoming request with the following params: \n METHOD: %s\n URL: %s\n', req.method, req.url);
    const email = req.query.email

    const commentsMock = [
        {userID: 'yuzvik.oleg@gmail.com', text: 'No comments.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'john.doe@mail.ru', text: 'There is a very long comment here.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'fakemail@fake.com', text: 'My email is fake, so is this comment.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
    ]
    let commentsToReturn
    if (email) {
        commentsToReturn = commentsMock.filter(comment => comment.userID.toLowerCase() === email.toLowerCase())
    } else {
        commentsToReturn = commentsMock
    }

    res.send(commentsToReturn)
})

app.post('/', (req, res) => {
    // TODO: implement create comment
})

app.listen(PORT, () => console.log(`Comments service is listening on port ${PORT}!`))

