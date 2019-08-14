import products from './products.js';
import translation from './translation.js';
// eslint-disable-next-line object-curly-newline
import { get, translate, addClass, removeClass, render } from './utils.js';

const state = {
  selected: {
    intensity: '',
    mastertone: '',
    undertone: '',
  },
  result: '',
  step: 1,
};

function activateStep(section) {
  removeClass('[data-step]', 'active');
  addClass(`[data-step="${section}"]`, 'active');
}

function showUndertones(mastertone) {
  if (mastertone !== '') {
    removeClass('.section-undertone .selectors', 'visible');
    addClass(`.selectors-${mastertone}`, 'visible');
  }
}

function activateAvailableUndertones(intensity, mastertone, availableTones) {
  const availableUndertones = get(availableTones, [intensity, mastertone]).children;

  removeClass('[data-undertone]', 'available');

  if (availableUndertones) {
    availableUndertones.forEach((element) => {
      addClass(`[data-undertone="${element.name}"]`, 'available');
    });
  }
}

function updateIntensity(intensity) {
  const intensityValue = document.querySelector('.intensity-value');
  render(intensity, intensityValue);

  if (intensity) {
    addClass('.mastertone', 'active');

    setTimeout(() => {
      activateStep('2');
    }, 200);
  }
}

function updateMastertone(intensity, mastertone, availableProducts) {
  const mastertoneValue = document.querySelector('.mastertone-value');
  render(mastertone, mastertoneValue);

  if (mastertone) {
    addClass('.undertone', 'active');
    showUndertones(mastertone);
    activateAvailableUndertones(intensity, mastertone, availableProducts);

    setTimeout(() => {
      activateStep('3');
    }, 200);
  }
}

function updateUndertone(undertone) {
  const undertoneValue = document.querySelector('.undertone-value');
  render(undertone, undertoneValue);

  if (undertone) {
    addClass('.result', 'active');

    setTimeout(() => {
      activateStep('4');
    }, 200);
  }
}

function updateResult(currentState, availableProducts) {
  const { intensity, mastertone, undertone } = currentState.selected;

  if (intensity && mastertone && undertone) {
    const shortenedResult = `${intensity.substring(0, 2)}${mastertone.substring(0, 1)}${undertone.substring(0, 1)}`;
    const mastertoneTranslated = translate(mastertone, translation);
    const undertoneTranslated = translate(undertone, translation);
    const product = get(availableProducts, [intensity, mastertone, undertone]);

    state.result = shortenedResult;

    // render result
    removeClass('.result-container', ['c10', 'c20', 'c30', 'c40', 'c50', 'c60', 'c70', 'c80', 'c90']);
    addClass('.result-container', `c${shortenedResult.substring(0, 2)}`);

    const resultValueNode = document.querySelector('.result-value');
    render(shortenedResult, resultValueNode);
    const resultCodeNode = document.querySelector('.result-code');
    render(shortenedResult, resultCodeNode);

    document.querySelector('.section-result .before-image').src = product.image_before;
    document.querySelector('.section-result .after-image').src = product.image_after;

    const intensityResult = `<strong>${intensity.substring(2)}</strong><br/>
      <span>Intensywność odcienia</span>`;
    const intensityResultNode = document.querySelector('.translate-intensity');
    render(intensityResult, intensityResultNode);

    const mastertoneResult = `<strong>${mastertone}</strong><br/>
      <span>${mastertoneTranslated[0]}</span>
      <span>tonacja</span>`;
    const mastertoneResultNode = document.querySelector('.translate-mastertone');
    render(mastertoneResult, mastertoneResultNode);

    const undertoneResult = `<strong>${undertone}</strong><br/>
      <span>${undertoneTranslated[1]}</span>
      <span>odcień</span>`;
    const undertoneResultNode = document.querySelector('.translate-undertone');
    render(undertoneResult, undertoneResultNode);

    const resultDescription = `${intensity.substring(2)} ${mastertoneTranslated[1]} o ${undertoneTranslated[2]} odcieniu`;
    const descriptionResultNode = document.querySelector('.result-description');
    render(resultDescription, descriptionResultNode);
  }
}

function updateView(currentState, availableProducts) {
  const { intensity, mastertone, undertone } = currentState.selected;
  updateIntensity(intensity);
  updateMastertone(intensity, mastertone, availableProducts);
  updateUndertone(undertone);
  updateResult(currentState, availableProducts);
}

function stepBack(stepNumber) {
  // override state
  if (stepNumber < 2) {
    state.selected.mastertone = '';
    state.selected.undertone = '';
    state.result = '';
  } else if (stepNumber < 3) {
    state.selected.undertone = '';
    state.result = '';
  } else if (stepNumber < 4) {
    state.result = '';
  }

  const navButtons = document.querySelectorAll('[data-step-vis]');

  // update classes for navigation buttons
  navButtons.forEach((element) => {
    if (element.dataset.stepVis > stepNumber) {
      element.classList.remove('active');
    }
  });
  addClass(`[data-step-vis="${stepNumber}"]`, 'active');

  // set state step
  state.step = stepNumber;

  activateStep(stepNumber);
}

// app init
function initializeApp() {
  removeClass('#ff-header', 'active');
  addClass('#ff-app', 'active');
}

// start the app button
const startButton = document.querySelector('#ff-start-button');

startButton.addEventListener('click', () => {
  setTimeout(() => {
    initializeApp();
  }, 200);
});

// buttons setting state
const selectorButtons = document.querySelectorAll('.data-selector');

selectorButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const key = Object.keys(item.dataset)[0]; // get data-key
    const value = Object.values(item.dataset)[0]; // get data-key="value"

    state.selected[key] = value;
    updateView(state, products);
  });
});

// navigation buttons
const navButtons = document.querySelectorAll('[data-step-vis]');

navButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const step = item.dataset.stepVis;
    state.step = step;
    stepBack(step);
  });
});
