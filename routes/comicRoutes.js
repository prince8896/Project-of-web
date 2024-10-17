const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comicController');

router.post('/comics', comicController.createComicBook);
router.put('/comics/:id', comicController.updateComicBook);
router.delete('/comics/:id', comicController.deleteComicBook);
router.get('/comics', comicController.getComicBooks);
router.get('/comics/:id', comicController.getComicBookById);

module.exports = router;
