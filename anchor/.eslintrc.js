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
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-empty':0,
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
    'no-shadow':0,
    'no-unused-expressions':0,
    'import/no-extraneous-dependencies':0,
    'prefer-destructuring':0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
