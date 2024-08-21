module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["fix", "update", "chore", "feat", "test"]],
    "type-empty": [2, "never"],
  },
};
