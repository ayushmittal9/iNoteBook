var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ayushisagoodb$oy';



module.exports = function fetchuser(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate using a valid token" });
    }
  };