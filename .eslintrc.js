module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: ["eslint:recommended", "prettier"],
  extends: ["plugin:prettier/recommende"],
  // plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    //   "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
