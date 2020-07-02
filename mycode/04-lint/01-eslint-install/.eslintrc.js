module.exports = {
  env: {
    browser: true,
    // es2020: true
    es6: false,
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 2015
  },
  rules: {
    "no-alert": "error"
  },
  globals: {
    'jQuery': 'readonly'
  },
}
