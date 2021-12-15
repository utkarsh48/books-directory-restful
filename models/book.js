const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const bookSchema = new mongoose.Schema({
	title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  author: { 
    type: String,
    required: true,
    min: 3,
    max: 255
  },
	pages: {
		type: Number,
		required: true,
		min: 1
	},
	price: {
		type: Number,
		required: true,
		min: 0
	}
});

bookSchema.methods.plain = function(){
	return _.omit(this.toObject(), "__v");
}

const Book = mongoose.model("Books", bookSchema);


exports.validateBook = function(book){
	const schema = Joi.object({
		title: Joi.string().min(5).max(255).required(),
		author: Joi.string().min(3).max(255).required(),
		pages: Joi.number().min(1).required(),
		price: Joi.number().min(0).required()
	}).options({ stripUnknown: true });

	return schema.validate(book);
}

exports.Book = Book;