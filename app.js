require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json());

const posts = [
    {
        name: 'john',
        title: 'One'

    },
    {
        name: 'mike',
        title: 'two'
    }
]

app.get('/posts',authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.name === req.user.name));
})



function authenticateToken(req, res, next){
    //Authorization Header will have the form " BEARER TOKEN "
    const authHeader = req.headers['authorization'];    //bearer
    const token = authHeader && authHeader.split(' ')[1]; //token
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)     //Invalid token, send the error to user
        req.user = user;
        next();

    })
}

app.listen(3000)
console.log('Listening to port 3000');
