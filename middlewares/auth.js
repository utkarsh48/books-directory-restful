const jwt = require("jsonwebtoken");

module.exports = function(req, res, next){
	const token = req.header("x-auth-token");

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWTPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.sendStatus(400);
  }
}