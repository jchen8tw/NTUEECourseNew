import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ''
//     }
//   };
// });

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:8000/graphql' }), // default: /graphql
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: 'same-origin' // send the cookie along with every request
  // credentials: 'include' // send the cookie along with every request
});

// const client = new ApolloClient({
//   link: createHttpLink({ uri: 'http://localhost:8000/graphql' }), // default: /graphql
//   request: operation => {
//     const token = localStorage.getItem('token');
//     operation.setContext({
//       headers: {
//         authorization: token
//       }
//     });
//   },
//   cache: new InMemoryCache(),
//   connectToDevTools: true
// });

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
