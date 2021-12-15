const express = require("express");

const books = require("../routes/books-route");
const user = require("../routes/user-route");

module.exports = function(app){
	app.use(express.json());
	app.use("/api/books", books);
	app.use("/api/user", user);
}