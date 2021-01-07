module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'mocha': true,
    'es6': true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-restricted-globals": ["error", "event", "fdescribe"],
    'vue/no-parsing-error': 0,
    'vue/no-use-v-if-with-v-for':0,
    'vue/valid-v-for':0,
    'import/no-extraneous-dependencies':0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'max-len': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': [
      'error',
      {
        'props': false
      }
    ],
    'consistent-return': 0,
    'no-unused-expressions': [2, {  // 禁止无用的表达式
      'allowShortCircuit': true,
      'allowTernary': true
    }],
    'no-unused-vars': [2, { 'args': 'none' }],
    'no-nested-ternary': 0,
    'no-useless-return': 0,
    'vue/no-unused-components': 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": false
    }, {
      "enforceForRenamedProperties": false
    }],
    "no-shadow": 0,
    "no-plusplus":0
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
