const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
	email: {
		type: String,
		min: 8,
		max: 255,
		required: true
	},
	password: {
		type: String,
		min: 8,
		max: 255,
		required: true
	},
	admin: {
		type: Boolean,
		required: true,
		default: false
	}
});

userSchema.methods.generateAuthToken = function(){
	return jwt.sign({
		email: this.email,
		admin: this.admin
	}, process.env.JWTPrivateKey);
}

userSchema.methods.plain = function(){
	return _.omit(this.toObject(), "__v");
}


const User = mongoose.model("User", userSchema);


exports.validateUser = function(user){
	const schema = Joi.object({
		email: Joi.string().min(8).required(),
		password: Joi.string().min(8).required()
	}).options({ stripUnknown: true });

	return schema.validate(user);
}

exports.User = User;