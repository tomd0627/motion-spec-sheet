module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-use-logical'],
  rules: {
    'order/properties-alphabetical-order': true,
    'declaration-no-important': null,
    'csstools/use-logical': 'always',
    'selector-class-pattern': null,
    'no-descending-specificity': null,
  },
};
