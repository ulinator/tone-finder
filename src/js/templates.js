import { translation, translate } from './translation.js';

function intensityTemplate(data) {
  return (
    `
    <li class="item">
      <div class="data-selector" data-intensity="${data.name}">
        <img class="image face-image" src="${data.image}" alt="" />

        <img class="image face-image-swap" src="${data.image_switch}" alt="" />

        <p class="description">
          <strong class="color-code">${data.name_code}</strong>
          <span class="color-name">${data.name_description}</span>
        </p>
      </div>
    </li>
    `
  );
}

function mastertoneTemplate(data) {
  const { ref } = data;
  return (
    `
    <li class="item">
      <div class="data-selector" data-mastertone="${ref.name}">
        <img class="image face-image face-image-${ref.name}" src="${ref.image_switch}" alt="" />

        <img class="image face-image-swap" src="${ref.image}" alt="" />
        <p class="description subtitle">${translate(ref.name, translation)[0]}</p>
      </div>
      <p class="description subtext">${ref.description}</p>
      <p class="description subtext">${ref.description_2}</p>

    </li>
    `
  );
}

function undertoneTemplate(data) {
  return (
    `
    <li class="item">
      <div class="data-selector" data-undertone="${data.name}">
        <img class="image face-image face-image-${data.name}" src="${data.image_switch}" alt="" />
        <img class="image face-image-swap" src="${data.image}" alt="" />

        <p class="description subtitle">${translate(data.name, translation)[1]}</p>
      </div>
    </li>
    `
  );
}

function resultTemplate(data, state) {
  return (
    `
    <li class="item">
      <img class="image before-image" src="${data.image_before}" alt="" />
    </li>

    <li class="item">
      <div class="result-container c${state.result.substring(0, 2)}" >

        <div class="result-row align-right">
          <p class="result-translation translate-mastertone">
            <strong>${state.selected.mastertone}<br/></strong>
            <span>${translate(state.selected.mastertone, translation)[0]}<br/></span>
            <span>tonacja</span>
          </p>
          <p class="result-translation translate-undertone">
            <strong>${state.selected.undertone}<br/></strong>
            <span>${translate(state.selected.undertone, translation)[1]}<br/></span>
            <span>odcień</span>
          </p>
        </div>

        <div class="result-row">
          <p class="result-code">${state.result}</p>
        </div>

        <div class="result-row align-left">
          <p class="result-translation translate-intensity">
            <strong>${state.selected.intensity}<br/></strong>
            <span>intensywność odcienia</span>
          </p>
        </div>

        <p class="result-description">${state.selected.intensity.substring(2)}
          ${translate(state.selected.mastertone, translation)[1]}
          o ${translate(state.selected.undertone, translation)[2]} odcieniu</p>
      </div>
    </li>

    <li class="item">
      <img class="image after-image" src="${data.image_after}" alt="" />
    </li>
    `
  );
}

// eslint-disable-next-line object-curly-newline
export { intensityTemplate, mastertoneTemplate, undertoneTemplate, resultTemplate };
