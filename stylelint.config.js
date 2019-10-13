/* eslint-disable sort-keys */
module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  plugins: ['stylelint-order'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'order/properties-alphabetical-order': true,
  },
};
