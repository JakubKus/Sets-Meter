module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  "rules": {
    "linebreak-style": [1, "windows"],
    "react/no-array-index-key": 0,
    "react/button-has-type": 0,
  }
};
