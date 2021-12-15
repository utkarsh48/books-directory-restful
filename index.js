const express = require("express");
const app = express();


require("./startup/config")(app);
require("./startup/routes")(app);
require("./startup/db")();


app.listen(process.env.PORT || 3000, ()=>console.log("listening..."));
