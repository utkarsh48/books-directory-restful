const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {User, generateAuthToken, validateUser} = require("../models/user");

router.post("/", async (req, res)=>{
	const { error } = validateUser(req.body);
	if(error) return res.sendStatus(400);

	let user = await User.findOne({email: req.body.email});
	if(user) return res.status(400).send("User with this email already exists");

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	user = new User({email: req.body.email, password: hashedPassword});

	await user.save();

	res.header("x-auth-token", user.generateAuthToken()).sendStatus(201);
});


router.post("/auth", async (req, res)=>{
	const { error } = validateUser(req.body);
	if(error) return res.sendStatus(400);

	const user = await User.findOne({email: req.body.email});

	const validatePassword = await bcrypt.compare(req.body.password, user.password);

	return res.header("x-auth-token", user.generateAuthToken()).sendStatus(200);
});


module.exports = router;