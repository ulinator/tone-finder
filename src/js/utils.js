function get(data, keys) {
  const key = keys.shift();
  const target = data.find((el) => el.name === key);
  if (target && target.children && keys.length > 0) {
    return get(target.children, keys);
  }
  return target;
}
// const res = get(products, ["10 Very Fair", "cool"])

function addClass(elements, classNames) {
  const nodes = document.querySelectorAll(elements);
  nodes.forEach((element) => element.classList.add(classNames));
}

function removeClass(elements, classNames) {
  const nodes = document.querySelectorAll(elements);
  nodes.forEach((element) => element.classList.remove(classNames));
}

function render(template, node) {
  if (!node) return;
  node.innerHTML = template;
}

function renderTemplate(node, template, data, currentState) {
  let newTemplate = '';
  if (Array.isArray(data)) {
    data.map((element) => {
      newTemplate += template(element);
    });
  } else {
    newTemplate = template(data, currentState);
  }

  render(newTemplate, node);
}

// eslint-disable-next-line object-curly-newline
export { get, addClass, removeClass, render, renderTemplate };
