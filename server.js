const express = require('express');
const Posts = require('./data/db.js')
const postsRouter = require('./api/postsRouter')

const server = express();

server.use('/api', postsRouter)

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8000, () => {console.log('API running on port 8000')})