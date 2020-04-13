const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.select().from('posts')
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error', err});
    });
});

router.get('/:id', (req, res) => {
    db('posts')
        .where({ id: req.params.id})
        .first()
        .then(post => {
            if (post) {
                res.status(200).json({ data: post });
            } else {
                res.status(404).json({ message: 'Post not found'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error', err});
        })
});

router.post('/', (req, res) => {
    const postData = req.body;
    db('posts')
        .insert(postData)
        .then(post => {
            res.status(200).json({data: post});
        })
        .catch(err => {
            res.status(500).json({ message: 'Error', err});
        })
});

router.put('/:id', (req, res) => {
    const newData = req.body;
    db('posts')
        .where({ id: req.params.id })
        .first()
        .update(newData)
        .then(post => {
            if (post) {
                res.status(200).json({ dataUpdated: post });
            } else {
                res.status(404).json({ message: 'Post not found'});
            }
        }).catch(err => {
            res.status(500).json({ message: 'Error', err});
        })
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .delete()
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'record deleted successfully' });
        } else {
            res.status(200).json({ message: 'post id not found' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error', err });
    })
});

module.exports = router;