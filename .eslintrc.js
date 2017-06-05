module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }]
  },
  globals: {
    ga: true,
    i18n: true,
  }
}
