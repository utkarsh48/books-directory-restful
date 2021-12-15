module.exports = function (req, res, next){
	if (!req.user.admin) return res.sendStatus(403);

  next();
}