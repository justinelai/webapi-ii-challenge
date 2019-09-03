const express = require('express');
const router = express.Router();
router.use(express.json())
const Posts = require('../data/db.js')

router.get('/', (req, res) => {
    res.send('Hello World...from /api');
});

// ========================= POST /api/posts =========================

router.post('/posts', (req, res) => {
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    } else {
        Posts.insert(req.body)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
    }
    
});

// ========================= GET /api/posts =========================

router.get('/posts', (req, res) => {
    Posts.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
    }
);




module.exports = router;