
module.exports = function(req, res, next) {
  req.originalUrl = req.originalUrl || req.url;
  next();
};
