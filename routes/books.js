// book routes

const router = require('express').Router();

const Book = require('../models/book.model');

router.route('/').get((req, res) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').get((req, res) => {
    Book.findById(req.params.id)
        .then(book => res.status(200).json(book))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;

    const newBook = new Book({ title, author, genre });
    newBook.save()
        .then(book => res.status(200).json(book))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').put((req, res) => {
    Book.findById(req.params.id)
        .then(book => {
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;

            book.save()
                .then(book => res.status(200).json(book))
                .catch(err => res.status(400).json('Error ' + err));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    Book.findOneAndDelete(req.params.id)
        .then(() => res.status(200).json(`Book with ID ${req.params.id} was successfully removed`))
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;