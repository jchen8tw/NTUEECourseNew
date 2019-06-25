import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:8000/graphql' }), // default: /graphql
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238'
    },
    secondary: {
      main: '#ffa000'
    }
  }
});

const Root = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
