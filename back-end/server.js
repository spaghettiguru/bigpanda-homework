const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())

app.get('/', (req, res) => {
    const email = req.query.email;

    const commentsMock = [
        {userID: 'yuzvik.oleg@gmail.com', text: 'No comments.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'john.doe@mail.ru', text: 'There is a very long comment here.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'fakemail@fake.com', text: 'My email is fake, so is this comment.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
    ]
    let commentsToReturn;
    if (email) {
        commentsToReturn = commentsMock.filter(comment => comment.userID.toLowerCase() === email.toLowerCase());
    } else {
        commentsToReturn = commentsMock;
    }

    res.send(commentsToReturn)
})
app.post('/:id', (req, res) => {})

app.listen(PORT, () => console.log(`Comments service is listening on port ${PORT}!`))