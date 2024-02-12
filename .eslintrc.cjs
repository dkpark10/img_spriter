module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "extends": [
    "standard-with-typescript",
    "prettier",
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "import/extensions": [
      "error",
      {
        "tsx": "never",
        "ts": "never",
        "js": "never",
        "jsx": "never"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/export': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js',
          '.ts',
          '.jsx',
          '.tsx',
        ],
      },
    ],
    'linebreak-style': 0,
  }
}
