function get(data, keys) {
  const key = keys.shift();
  const target = data.find((el) => el.name === key);
  if (target && target.children && keys.length > 0) {
    return get(target.children, keys);
  }
  return target;
}
// const res = get(products, ["10 Very Fair", "cool"])

function translate(phrase, translationArray) {
  return translationArray[phrase];
}

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

// eslint-disable-next-line object-curly-newline
export { get, translate, addClass, removeClass, render };
