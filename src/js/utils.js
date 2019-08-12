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

export { get, translate };
