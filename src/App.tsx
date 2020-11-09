import * as React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Routes from './Routes';

const container = document.getElementById('container');

if (container) {
  render(
    <React.StrictMode>
      <HashRouter basename="/">
        <Layout>
          {/* @ts-ignore missing props are passed by layout */}
          <Routes />
        </Layout>
      </HashRouter>
    </React.StrictMode>,
    container,
  );
}
