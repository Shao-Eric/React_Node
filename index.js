const express = require('express'); //common js modules
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
    //cookieKey is madeup, we can have multiple random keys
  })
);

app.use(passport.initialize());
app.use(passport.session());
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like out main.js file or main.css file
  // if you dont recognize the routes, check the client/build folder to see if
  // you can find the files in there
  app.use(express.static('client/build'));

  // express will serve up the index.html file
  // if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
