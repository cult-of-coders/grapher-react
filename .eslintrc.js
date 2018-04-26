module.exports = {
  extends: [
    'standard',
    'plugin:meteor/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['react', 'meteor', 'import'],
  settings: {
    'import/resolver': {
      meteor: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    // "import/no-duplicates": 0,
    // "react/display-name": 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    // "indent": [
    //     "error",
    //     "tab"
    // ],
    semi: 0,
    // "meteor/no-session": 0
  },
};
