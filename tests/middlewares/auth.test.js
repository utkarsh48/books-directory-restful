const _ = require("lodash");
const auth = require("../../middlewares/auth");
const {User} = require("../../models/user");


describe("Validate JWT from request", ()=>{
	it("should pass payload of jwt in req.user", ()=>{
		const sampleUser = {
			email: "exmple@email.com",
			password: "12345678"
		};
	
		const user = new User(sampleUser);
		const token = user.generateAuthToken();
	
		const req = {
			header: jest.fn().mockReturnValue(token)
		}, res = {}, next = jest.fn();
	
		auth(req, res, next);
	
		expect(req.user).toMatchObject(_.pick(user.plain(), "email", "admin"));
		
	});

});