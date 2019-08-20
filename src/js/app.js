/* eslint-disable object-curly-newline */
import { products } from './products.js';
import { get, addClass, removeClass, renderTemplate } from './utils.js';
import { intensityTemplate, mastertoneTemplate, undertoneTemplate, resultTemplate } from './templates.js';
import { renderNavigation } from './navigation.js';
import { state, setStateBack, getStep, setResult } from './state.js';

// app init
function initializeApp() {
  const intensity = document.querySelector('[data-render="intensity"]');

  setTimeout(() => {
    renderNavigation(state);
    renderTemplate(intensity, intensityTemplate, products);
    removeClass('#ff-header', 'active');
    addClass('#ff-app', 'active');
  }, 200);
}

function updateIntensity(currentState, availableProducts) {
  const { intensity } = currentState.selected;

  if (intensity) {
    const mastertoneData = get(availableProducts, [intensity]).children;
    const mastertoneNode = document.querySelector('[data-render="mastertone"]');
    renderTemplate(mastertoneNode, mastertoneTemplate, mastertoneData);
  }
}

function updateMastertone(currentState, availableProducts) {
  const { intensity, mastertone } = currentState.selected;

  if (mastertone) {
    const undertoneNode = document.querySelector('[data-render="undertone"]');
    const undertoneData = get(availableProducts, [intensity, mastertone]).children;
    renderTemplate(undertoneNode, undertoneTemplate, undertoneData);
  }
}

function updateUndertone(currentState, availableProducts) {
  const { intensity, mastertone, undertone } = currentState.selected;

  if (undertone) {
    const resultNode = document.querySelector('[data-render="result"]');
    const resultData = get(availableProducts, [intensity, mastertone, undertone]);
    setResult(currentState);
    renderTemplate(resultNode, resultTemplate, resultData, state);
  }
}

function showCurrentSection(currentState) {
  const { step } = currentState;
  const stepNodes = document.querySelectorAll('[data-step]');

  stepNodes.forEach((element) => {
    element.classList.remove('active');
  });

  document.querySelector(`[data-step="${step}"]`).classList.add('active');
}

function updateView(currentState, availableProducts) {
  updateIntensity(currentState, availableProducts);
  updateMastertone(currentState, availableProducts);
  updateUndertone(currentState, availableProducts);

  renderNavigation(currentState);
  showCurrentSection(currentState);
}

const startButton = document.querySelector('#ff-start-button');
startButton.addEventListener('click', () => initializeApp());

const navButtons = document.querySelectorAll('[data-step-vis]');
navButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const clickedStep = parseInt(item.dataset.stepVis, 10);
    state.step = clickedStep;
    setStateBack(clickedStep);
    updateView(state, products);
  });
});

const app = document.querySelector('.foundation-finder-app');
// event delegation
app.addEventListener('click', (event) => {
  if (event.target && event.target.closest('div.data-selector')) {
    const item = event.target.closest('div.data-selector');
    const key = Object.keys(item.dataset)[0]; // get data-key
    const value = Object.values(item.dataset)[0]; // get data-key="value"
    state.selected[key] = value;
    state.step = getStep(state);
    updateView(state, products);
  }
});
