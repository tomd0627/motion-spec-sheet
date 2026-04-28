module.exports = {
  'src/**/*.js': ['prettier --write', 'eslint --fix'],
  'src/**/*.css': (files) => [
    `prettier --write ${files.join(' ')}`,
    `stylelint --fix ${files.join(' ')}`,
  ],
  '*.{html,json,md}': ['prettier --write'],
};
