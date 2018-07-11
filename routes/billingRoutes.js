const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    //console.log(req.body);
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    //req.body is the parsed json after body parse is wired up
    //check index.js to see how bodyparser middleware is wired up
    //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
