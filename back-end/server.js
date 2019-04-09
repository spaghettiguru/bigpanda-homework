import express from 'express';

const app = express()
const port = 3000

app.get('/', (req, res) => {
    
    res.send([
        {userID: 'yuzvik.oleg@gmail.com', text: 'No comments.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'john.doe@mail.ru', text: 'There is a very long comment here.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'},
        {userID: 'fakemail@fake.com', text: 'My email is fake, so is this comment.', userPicURL: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}
    ]);
});
app.post('/:id', (req, res) => {});

app.listen(port, () => console.log(`Comments service is listening on port ${port}!`))