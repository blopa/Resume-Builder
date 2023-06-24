const a11yLabelRequiredOptions = {
    required: {
        some: ['nesting', 'id'],
    },
};

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
        'plugin:gatsby/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    globals: {
        adyen: true,
        analytics: true,
        bootbox: true,
        isTestingEnvironment: true,
        laravelRegister: true,
        PSPDFKit: true,
        snackbar: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'unused-imports', 'import'],
    rules: {
        'gatsby/use-gatsby-link': 'warn',
        'import/no-unresolved': [
            2,
        ],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/label-has-associated-control': ['error', a11yLabelRequiredOptions],
        'jsx-a11y/label-has-for': ['error', a11yLabelRequiredOptions],
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/tabindex-no-positive': 'warn',
        'no-console': 'off',
        'no-debugger': 'warn',
        'react/display-name': 'off',
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-no-useless-fragment': 'warn',
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'warn',
        'sonarjs/cognitive-complexity': 'warn',
        'sonarjs/max-switch-cases': 'warn',
        'sonarjs/no-collapsible-if': 'warn',
        'sonarjs/no-duplicated-branches': 'warn',
        'sonarjs/no-duplicate-string': 'warn',
        'sonarjs/no-gratuitous-expressions': 'warn',
        'sonarjs/no-identical-functions': 'warn',
        'sonarjs/no-nested-template-literals': 'off',
        'sonarjs/no-small-switch': 'warn',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'react-hooks/exhaustive-deps': ['warn'],
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
    },
    settings: {
        react: {
            version: require('react/package.json').version,
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx'],
            },
        },
    },
    overrides: [],
};
