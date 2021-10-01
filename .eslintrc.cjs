module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        "import",
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:import/recommended",
        "plugin:import/typescript"
    ],
    rules: {
        "no-empty": ["error", { "allowEmptyCatch": true }],
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-array-constructor": "error",
        "indent": ["error", 4],
        "yield-star-spacing": "error",
        "no-useless-return": "error",
        "import/no-unresolved": "off",
        "linebreak-style": ["error", "unix"],
        "import/newline-after-import": ["error", { "count": 2 }]
    },
    settings: {
        "import/ignore": ["^tslib$"]
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/ban-types": ["error", {
                    types: {
                        "object": false
                    }
                }],
                "@typescript-eslint/no-this-alias": ["error", { allowedNames: ["self"] }],
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "prefer-rest-params": "off",
                "no-var": "off"
            }
        }
    ]
};