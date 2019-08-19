const translation = {
  cool: ['chłodna', 'chłodny', 'chłodnym'],
  neutral: ['neutralna', 'neutralny', 'neutralnym'],
  warm: ['ciepła', 'ciepły', 'ciepłym'],
  pink: ['różowa', 'różowy', 'różowym'],
  blue: ['niebieska', 'niebieski', 'niebieskim'],
  green: ['oliwkowa', 'oliwkowy', 'oliwkowym'],
  yellow: ['złota', 'złoty', 'złotym'],
  orange: ['brzosk-winiowa', 'brzosk-winiowy', 'brzoskwiniowym'],
  red: ['czerwona', 'czerwony', 'czerwonym'],
};

function translate(phrase, translationArray) {
  return translationArray[phrase];
}

export { translation, translate };
