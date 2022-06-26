module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // 关闭驼峰命名规则
        'vue/multi-word-component-names': 0,
        // 允许非空断言
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 允许驼峰命名
        'vue/attribute-hyphenation': 'off',
        // 允许事件驼峰命名
        'vue/v-on-event-hyphenation': 'off'
    }
}
