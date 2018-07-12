module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  next(); // if the user is logged in, pass the request to the next middleware
};

// next is a function we call after we call is finished, like the done function
// pass the request to the next middleware
