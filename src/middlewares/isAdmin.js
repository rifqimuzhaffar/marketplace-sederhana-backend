const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({
      message: "Forbidden",
      error: "Access denied. Admin role required.",
    });
  }
  next();
};

module.exports = isAdmin;
