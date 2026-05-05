const js = require('@eslint/js')
const globals = require('globals')

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error'
    }
  }
]