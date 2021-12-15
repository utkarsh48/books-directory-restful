const mongoose = require("mongoose");

module.exports = ()=>{
	mongoose.connect(process.env.DBLink, {
	  useNewUrlParser: true,
	  useUnifiedTopology: true
	}).then(()=>{
	  console.log("connected to db...")
	})
	.catch((er)=>{
	  console.log("an error occured", er);
	});
}
