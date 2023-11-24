const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const port = 4000;
const secretText = 'superSecret';

const posts = [
    {
        username: 'Asher',
        title: 'post 1',
    },
    {
        username: 'John',
        title: 'post 2',
    },
];

app.use(express.json());

// 로그인 API
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = { name: username };

    // JWT 이용해서 토큰 생성하기
    const accessToken = jwt.sign(user, secretText);
    res.json({ accessToken: accessToken });
});

// 글 목록 API
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.listen(port, () => {
    console.log(`listening on Port ${port}`);
});
