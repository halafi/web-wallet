import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';

const container = document.getElementById('container');

if (container) {
  render(
    <React.StrictMode>
      <HashRouter basename="/">
        <Layout>
          <Routes />
        </Layout>
      </HashRouter>
    </React.StrictMode>,
    container,
  );
}
