import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import ReactGA from 'react-ga';
import { CookiesProvider  } from 'react-cookie';
import App from './components/App/App';

WebFont.load({
  google: {
    families: ['PT Mono:400', 'sans-serif'],
  },
});

const googleAnalyticsId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(googleAnalyticsId);
ReactGA.pageview('/');

ReactDOM.render(
  <CookiesProvider><App /></CookiesProvider>,
  document.getElementById('root')
);
