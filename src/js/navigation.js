/* eslint-disable object-curly-newline */
import { addClass } from './utils.js';

const navigationMap = {
  intensityNav: document.querySelector('.intensity'),
  intensityValue: document.querySelector('.intensity-value'),
  mastertoneNav: document.querySelector('.mastertone'),
  mastertoneValue: document.querySelector('.mastertone-value'),
  undertoneNav: document.querySelector('.undertone'),
  undertoneValue: document.querySelector('.undertone-value'),
  resultNav: document.querySelector('.result'),
  resultValue: document.querySelector('.result-value'),
};

function renderNavigation(currentState, elements = navigationMap) {
  const { intensity, mastertone, undertone } = currentState.selected;
  const { result } = currentState;
  const { intensityNav, intensityValue, mastertoneNav, mastertoneValue,
    undertoneNav, undertoneValue, resultNav, resultValue } = elements;

  [intensityNav, intensityValue, mastertoneNav, mastertoneValue,
    undertoneNav, undertoneValue, resultNav, resultValue]
    .forEach((element) => {
      element.classList.remove('active');
    });

  addClass('.intensity', 'active');
  intensityValue.innerHTML = intensity;

  if (intensity !== '') {
    addClass('.intensity-value', 'active');
    addClass('.mastertone', 'active');
  }

  mastertoneValue.innerHTML = mastertone;
  if (mastertone !== '') {
    addClass('.mastertone-value', 'active');
    addClass('.undertone', 'active');
  }

  undertoneValue.innerHTML = undertone;
  if (undertone !== '') {
    addClass('.undertone-value', 'active');
    addClass('.result', 'active');
  }

  resultValue.innerHTML = result;
  if (result !== '') {
    addClass('.result-value', 'active');
  }
}

export { renderNavigation };
