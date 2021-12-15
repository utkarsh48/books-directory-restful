const express = require("express");

const books = require("../routes/books-route");
const user = require("../routes/user-route");

module.exports = function(app){
	app.use(express.json());
	app.use("/api/books", books);
	app.use("/api/user", user);

	app.get("/", (req, res)=>{
		res.send("Refer to documentation <a href='https://github.com/utkarsh48/books-directory-restful#readme'>here</a>");
	})
}