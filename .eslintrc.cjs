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
        "import/newline-after-import": ["error", { "count": 2 }],
        "eol-last": ["error", "always"],
        "quotes": ["error", "double", { "avoidEscape": true }],
        "padding-line-between-statements": [
            "error",
            { blankLine: "always", prev: ["const", "let", "var", "class", "export"], next: "*" },
            { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
            // { blankLine: "never", prev: ["const", "let", "var"].flatMap(x => [x, "multiline-" + x]), next: ["block-like", "multiline-block-like"] },
            { blankLine: "always", prev: "*", next: "return" },
            { blankLine: "always", prev: ["for", "while"], next: ["for", "while"] },
        ]
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