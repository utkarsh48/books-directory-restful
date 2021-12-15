const {User, validateUser} = require("../../models/user");


describe("Allow only valid user schemas", ()=>{
	it("should allow valid schema", ()=>{
		const {error} = validateUser({
			email: "exmple@email.com",
			password: "0476kgf234"
		});

		expect(error).toBeUndefined();
	});

	it("should not allow invalid schema", ()=>{
		const schemas = [
			{
				email: "exmple@email.com",
				password: "f234"
			},
			{
				email: "exmple@email.com",
			},
			{}
		];

		schemas.forEach(sch=>{
			const {error} = validateUser(sch);
			
			expect(error).not.toBeUndefined();
		});

	});
});
