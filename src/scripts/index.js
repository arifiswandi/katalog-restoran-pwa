import 'regenerator-runtime';

import '../styles/main.css';
import '../styles/responsive.css';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import './components/skip-component';
import './components/header-component';
import './components/hero-component';
import './components/loading-component';
import './components/footer-component';

import App from './views/app';

import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});