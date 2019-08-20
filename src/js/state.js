/* eslint-disable object-curly-newline */
const state = {
  selected: {
    intensity: '',
    mastertone: '',
    undertone: '',
  },
  result: '',
  step: 1,
};

function setStateBack(newStep) {
  if (newStep < 2) {
    state.selected.intensity = '';
    state.selected.mastertone = '';
    state.selected.undertone = '';
    state.result = '';
  } else if (newStep < 3) {
    state.selected.mastertone = '';
    state.selected.undertone = '';
    state.result = '';
  } else if (newStep < 4) {
    state.selected.undertone = '';
    state.result = '';
  }
}

function getStep(currentState) {
  let step = 1;
  const { intensity, mastertone, undertone } = currentState.selected;
  if (intensity) {
    step = 2;
  }
  if (mastertone) {
    step = 3;
  }
  if (undertone) {
    step = 4;
  }
  return step;
}

function setResult(currentState) {
  const { intensity, mastertone, undertone } = currentState.selected;
  const intensityNumber = intensity.substring(0, 2);
  const mastertoneFirstLetter = mastertone.substring(0, 1);
  const undertoneFirstLetter = undertone.substring(0, 1);

  state.result = `${intensityNumber}${mastertoneFirstLetter}${undertoneFirstLetter}`;
}

export { state, setStateBack, getStep, setResult };
