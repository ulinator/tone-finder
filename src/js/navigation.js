import { addClass } from './utils.js';

function renderNavigation(currentState, elements) {
  const { intensity, mastertone, undertone } = currentState.selected;
  const { result } = currentState;
  // eslint-disable-next-line object-curly-newline
  const { intensityNav, mastertoneNav, undertoneNav, resultNav } = elements;

  [intensityNav, mastertoneNav, undertoneNav, resultNav].forEach((element) => {
    element.classList.remove('active');
  });

  addClass('.intensity', 'active');
  intensityNav.innerHTML = intensity;

  if (intensity !== '') {
    addClass('.intensity-value', 'active');
    addClass('.mastertone', 'active');
  }

  mastertoneNav.innerHTML = mastertone;
  if (mastertone !== '') {
    addClass('.mastertone-value', 'active');
    addClass('.undertone', 'active');
  }

  undertoneNav.innerHTML = undertone;
  if (undertone !== '') {
    addClass('.undertone-value', 'active');
    addClass('.result', 'active');
  }

  resultNav.innerHTML = result;
  if (result !== '') {
    addClass('.result-value', 'active');
  }
}

export { renderNavigation };
