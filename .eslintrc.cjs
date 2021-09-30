module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "no-empty": ["error", { "allowEmptyCatch": true }]
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
                "no-var": "off",
            }
        }
    ]
};