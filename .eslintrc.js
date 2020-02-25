module.exports = {
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  extends: [
    "plugin:vue/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "development" ? "off" : "error",
    "no-unused-vars": "warn",
    "indent": "warn",
    "no-undef": "warn",
    "vue/max-attributes-per-line": "off",
    "vue/no-unused-components": "warn",
    "vue/require-default-prop": "off"
  }
}
