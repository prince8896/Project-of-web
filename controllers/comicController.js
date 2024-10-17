const ComicBook = require('../models/comicBookModel');

// Create a new comic book
exports.createComicBook = async (req, res) => {
    try {
        const comicBook = new ComicBook(req.body);
        await comicBook.save();
        res.status(201).json(comicBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit a comic book
exports.updateComicBook = async (req, res) => {
    try {
        const comicBook = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(comicBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteComicBook = async (req, res) => {
    try {
        const deletedComic = await ComicBook.findByIdAndDelete(req.params.id);

        if (!deletedComic) {
            return res.status(404).json({ message: "Comic book not found" });
        }

        // Use 200 or 202 to send a response with a message
        res.status(200).json({ message: "Comic book deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Fetch all comic books with pagination, filtering, and sorting
exports.getComicBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, author, year, price, condition } = req.query;
        const filter = {};
        if (author) filter.authorName = author;
        if (year) filter.yearOfPublication = year;
        if (price) filter.price = { $lte: price };
        if (condition) filter.condition = condition;

        const comicBooks = await ComicBook.find(filter)
            .sort({ price: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        res.json(comicBooks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get comic book details by ID
exports.getComicBookById = async (req, res) => {
    try {
        const comicBook = await ComicBook.findById(req.params.id);
        res.json(comicBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
