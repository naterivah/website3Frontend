module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,

    "no-mixed-spaces-and-tabs": [0],
    "no-tabs": 0,
    "skipBlankLines": 0,
    "padded-blocks": 0,
    "new-cap": 1,
    "ignoreComments": 0,
    "no-trailing-spaces": [2, { "skipBlankLines": true }],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
