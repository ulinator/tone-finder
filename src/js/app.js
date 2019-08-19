import { products } from './products.js';
// eslint-disable-next-line object-curly-newline
import { state, get, addClass, removeClass, renderTemplate } from './utils.js';
// eslint-disable-next-line object-curly-newline
import { intensityTemplate, mastertoneTemplate, undertoneTemplate, resultTemplate } from './templates.js';
import { renderNavigation } from './navigation.js';

// app init
function initializeApp() {
  const intensity = document.querySelector('[data-render="intensity"]');

  setTimeout(() => {
    renderTemplate(intensity, intensityTemplate, products);
    removeClass('#ff-header', 'active');
    addClass('#ff-app', 'active');
  }, 200);
}

function showCurrentSection(currentState) {
  const { step } = currentState;
  const stepNodes = document.querySelectorAll('[data-step]');

  if (step < 2) {
    state.selected.intensity = '';
    state.selected.mastertone = '';
    state.selected.undertone = '';
    state.result = '';
  } else if (step < 3) {
    state.selected.mastertone = '';
    state.selected.undertone = '';
    state.result = '';
  } else if (step < 4) {
    state.selected.undertone = '';
    state.result = '';
  }

  stepNodes.forEach((element) => {
    element.classList.remove('active');
  });

  document.querySelector(`[data-step="${step}"]`).classList.add('active');
}

const elementMap = {
  intensityNav: document.querySelector('.intensity-value'),
  intensitySection: document.querySelector('.section-intensity'),

  mastertoneNav: document.querySelector('.mastertone-value'),
  mastertoneSection: document.querySelector('.section-mastertone'),

  undertoneNav: document.querySelector('.undertone-value'),
  undertoneSection: document.querySelector('.section-undertone'),

  resultNav: document.querySelector('.result-value'),
  resultSection: document.querySelector('.section-result'),
};

const startButton = document.querySelector('#ff-start-button');

startButton.addEventListener('click', () => initializeApp());

// const navButtons = document.querySelectorAll('[data-step-vis]');

// navButtons.forEach((item) => {
//   item.addEventListener('click', () => {
//     const clickedStep = parseInt(item.dataset.stepVis);
//     console.log('clicking on step: ', clickedStep);

//     state.step = clickedStep;
//     console.log(state.step);
//     updateView(state, products);
//   });
// });

function updateIntensity(currentState, availableProducts) {
  const { intensity } = currentState.selected;

  if (intensity) {
    // addClass('.intensity-value', 'active');
    const mastertoneData = get(availableProducts, [intensity]).children;
    const mastertoneNode = document.querySelector('[data-render="mastertone"]');
    state.step = 2;
    renderTemplate(mastertoneNode, mastertoneTemplate, mastertoneData);
  }
}

function updateMastertone(currentState, availableProducts) {
  const { intensity, mastertone } = currentState.selected;

  if (mastertone) {
    // addClass('.undertone', 'active');
    const undertoneNode = document.querySelector('[data-render="undertone"]');
    const undertoneData = get(availableProducts, [intensity, mastertone]).children;
    state.step = 3;
    renderTemplate(undertoneNode, undertoneTemplate, undertoneData);
  }
}

function setResult(currentState) {
  const { intensity, mastertone, undertone } = currentState.selected;
  const intensityNumber = intensity.substring(0, 2);
  const mastertoneFirstLetter = mastertone.substring(0, 1);
  const undertoneFirstLetter = undertone.substring(0, 1);

  state.step = 4;
  state.result = `${intensityNumber}${mastertoneFirstLetter}${undertoneFirstLetter}`;
}

function updateUndertone(currentState, availableProducts) {
  const { intensity, mastertone, undertone } = currentState.selected;

  if (undertone) {
    // addClass('.result', 'active');
    const resultNode = document.querySelector('[data-render="result"]');
    const resultData = get(availableProducts, [intensity, mastertone, undertone]);
    setResult(currentState);
    renderTemplate(resultNode, resultTemplate, resultData, state);
  }
}

function updateView(currentState, availableProducts) {
  updateIntensity(currentState, availableProducts);
  updateMastertone(currentState, availableProducts);
  updateUndertone(currentState, availableProducts);

  renderNavigation(currentState, elementMap);
  showCurrentSection(currentState);
}

const app = document.querySelector('.foundation-finder-app');

// event delegation
app.addEventListener('click', (event) => {
  if (event.target && event.target.closest('div.data-selector')) {
    const item = event.target.closest('div.data-selector');
    const key = Object.keys(item.dataset)[0]; // get data-key
    const value = Object.values(item.dataset)[0]; // get data-key="value"
    state.selected[key] = value;

    updateView(state, products);
  }
});
