const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');




require('../models/books');
const BookModel = mongoose.model('books');
require('../models/categories');
const CategoryModel = mongoose.model('category');
require('../models/author');
const AuthorModel = mongoose.model('author');




router.get('/getBooks', (req, res) => {
    BookModel.find({}, (error, books) => {
        if (error) {
            console.log(error);
        } else {
            if (books) {
                res.status(200).send(books);
            } else {
                res.status(404).send({ message: 'Cant Find Books' })
            };
        };
    });
});
router.get('/getBookCategories', (req, res) => {
    CategoryModel.find({}, (err, categories) => {
        if (err) {
            console.log(err);
        } else {
            if (categories) {
                res.status(200).send(categories)
            } else {
                res.status(404).send({ message: 'cant find categories ' })
            }
        }
    });
});
router.post('/addauthor', (req, res) => {
    AuthorModel.findOne({ name: req.body.name }, (err, author) => {
        if (err) {
            console.log(err);
        } else {
            if (author) {
                res.status(409).send({ message: 'This author already exists' })
            } else {
                new AuthorModel(req.body)
                    .save()
                    .then(author => { res.status(200).send(author) });
            }
        }
    });
});
router.get('/getauthors', (req, res) => {
    AuthorModel.find({})
        .then(authors => { res.status(200).send(authors); })
        .catch(err => console.log(err));
})
router.post('/addbook', (req, res) => {
    BookModel.findOne({ name: req.name }, (err, book) => {
        if (err) {
            console.log(err)
        } else {
            if (book) {
                res.status(409).send({ message: 'book already exists' })
            } else {
                new BookModel(req.body)
                    .save()
                    .then(author => res.status(200).send(author))
            };
        };
    });
});
router.post('/autorSearch', (req, res) => {
    if (req.body.term !== '') {
        AuthorModel.find({ name: { $regex: req.body.term.toLowerCase() } }, (err, authors) => {
            if (err) {
            } else {
                if (authors) {
                    res.json(authors);
                }
            };
        });
    } else {
        res.json([])
    }

});
module.exports = router;