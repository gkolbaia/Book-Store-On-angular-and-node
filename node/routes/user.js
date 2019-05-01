const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

require('../models/author');
require('../models/books');
const AuthorModel = mongoose.model('author');
const BooksModel = mongoose.model('books');



router.post('/mainsearch', (req, res) => {
    result = []
    if (req.body.term !== '') {
        BooksModel.find({ name: { $regex: req.body.term.toLowerCase() } }, (err, books) => {
            if (err) {
                console.log(err)
            } else {
                if (books) {
                    books.forEach(book => { result.push(book) });
                };
                AuthorModel.find({ name: { $regex: req.body.term.toLowerCase() } }, (err, authors) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (authors) {
                            authors.forEach(author => { result.push(author) });
                        }
                        res.status(200).send(result.slice(0, 10))
                    };
                });
            };
        });
    } else {
        res.send([])
    }
});
router.post('/getcurrentauthor', (req, res) => {
    AuthorModel.findOne({ name: req.body.name }, (err, author) => {
        if (err) {
            console.log(res);
        } else {
            if (author) {
                res.status(200).send(author);
            } else {
                res.status(404).send({ message: 'could not find this author' })
            }
        }
    });
});
router.post('/getcurrentbook', (req, res) => {
    BooksModel.findOne({ name: req.body.name }, (err, book) => {
        if (err) {
            console.log(err);
        } else {
            if (book) {
                res.status(200).send(book)
            } else {
                res.status(404).send({ message: 'cant find book' })
            }
        }
    })
})


module.exports = router