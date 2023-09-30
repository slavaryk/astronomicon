module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:astro/recommended",
		"plugin:vue/vue3-essential",
		"eslint:recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
	},
	overrides: [
		{
			files: ["*.astro"],
			parser: "astro-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
				extraFileExtensions: [".astro"],
			},
		},
		{
			files: ["*.vue"],
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
	rules: {
		"semi": ["error", "always"],
		"quotes": ["error", "double"],
		"comma-dangle": ["error", "always-multiline"],
		"indent": ["error", "tab"],
		"arrow-parens": ["error", "as-needed"],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error",
	},
};
