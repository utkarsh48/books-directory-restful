const {Book, validateBook} = require("../../models/book");


describe("Allow only valid book schemas", ()=>{
	it("should allow valid schema", ()=>{
		const {error} = validateBook({
			title: "A book",
			author: "An author",
			pages: 123,
			price: 123
		});

		expect(error).toBeUndefined();
	});

	it("should not allow invalid schema", ()=>{
		const schemas = [
			{
				title: "A book",
				author: "An author",
				pages: 123,
			},
			{}
		];

		schemas.forEach(sch=>{
			const {error} = validateBook(sch);
			
			expect(error).not.toBeUndefined();
		});

	});
});