const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const PasswordProcessor = require('./src/PasswordProcessor.js');
const resolvers = require('./src/resolver.js');
const typeDefs = require('./src/schema.js');
const { Student } = require('./src/model.js');

const port = process.env.PORT || 8000;
const saltRounds = 10;
const secret = 'TODO: replace this with better secret';

mongoose.connect('mongodb://test:debug1@ds231207.mlab.com:31207/course_test', {
  useNewUrlParser: true,
  useCreateIndex: true // Avoid node DeprecationWarning
});
mongoose.connection.once('open', () =>
  console.log('Successfully connected to MongoDB')
);

const passwordProcessor = new PasswordProcessor(saltRounds, secret);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const auth = req.headers.authorization.split(" ")[1] || '';
    const token = passwordProcessor.isValid(auth) ? auth : null;
    // Assume user is valid if the token is valid
    // The context is regenerated upon each request
    return {
      res,
      token,
      passwordProcessor
    };
  }
});
const app = express();
server.applyMiddleware({ app });

app.use(express.static('../frontend/build'));
app.use((req, res, next) => {
  res.redirect('/'); // Redirect 404 to root
});

app.listen(port, () =>
  console.log(`
  Server listening on http://localhost:${port}

  Graphql playground running on http://localhost:${port}/graphql
`)
);
