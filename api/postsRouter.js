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

// ========================= GET /api/posts/:id =========================

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then(post => {
        post == 0 ? res.status(404).json({ message: "The post with the specified ID does not exist." })
        : res.status(200).json(post) 
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

// ========================= PUT /api/posts/:id =========================

router.put('/posts/:id', (req, res) => {
    const id = req.params.id
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.update(id, req.body)
    .then(post => {
        post === 1 ?
        res.status(201).json(req.body) :
        res.status(404).json({ message: "The post with the specified ID does not exist." }) 
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
    }

})


module.exports = router;