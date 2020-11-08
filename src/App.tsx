import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';

const container = document.getElementById('container');

if (container) {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </React.StrictMode>,
    container,
  );
}
