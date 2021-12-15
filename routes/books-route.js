const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {Book, validateBook} = require("../models/book");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");


router.get("/", auth, async (req, res)=>{
	const books = await Book.find().sort("name");

  res.send(books);
});


router.get("/:id", auth, async (req, res)=>{
	const book = await Book.findById(req.params.id);

	if(!book) return res.sendStatus(404);

	res.send(book.plain());
});


router.post("/", auth, admin, async (req, res)=>{
	const { error } = validateBook(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let book = new Book(_.pick(req.body, ["title", "author", "pages", "price"]));

	book = await book.save();

	res.status(201).send(book.plain());
});


router.put("/:id", auth, admin, async (req, res)=>{
	const { error } = validateBook(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	let book = await Book.findByIdAndUpdate(req.params.id, _.pick(req.body, ["title", "author", "pages", "price"]), { new: true });

	if(!book) return res.sendStatus(404);

	res.status(202).send(book.plain());
});


router.delete("/:id", auth, admin, async (req, res)=>{
	const book = await Book.findByIdAndRemove(req.params.id);

	if(!book) return res.sendStatus(404);

	res.status(202).send(book.plain());
});


module.exports = router;