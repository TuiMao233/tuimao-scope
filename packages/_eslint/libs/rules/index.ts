import { Linter } from 'eslint'

/**
 * @author: Mr.Mao
 * @description: Common eslint rules
 * @module eslint
 * @module prettier
 */
export const commons: Linter.HasRules['rules'] = {
  'prettier/prettier': 'warn',
  'no-debugger': 'error',
  'no-console': ['error', { allow: ['warn', 'error'] }],

  // 使用单引号
  quotes: 'off',
  // 禁止使用var表达式
  'no-var': 'warn',
  // 未修改变量不允许使用 let 定义
  'prefer-const': 'warn',
  // 对象属性需简写
  'object-shorthand': 'warn',
  // 禁止不必要的嵌套 const isYes = answer === 1 ? true : false;
  'no-unneeded-ternary': 'error',
  // 回调中使用箭头
  'prefer-arrow-callback': 'warn',
  // 禁止在条件中使用常量表达式 if(true) if(1)
  'no-constant-condition': 'error',
  // 如果if语句里面有return,后面不能跟else语句
  'no-else-return': 'warn',
  // 禁止超过三层的回调调用
  'max-nested-callbacks': ['error', 3],
  // 允许任意全局变量
  'no-undef': 'off',
  // 不允许空的代码块, 但允许空的捕获
  'no-empty': ['error', { allowEmptyCatch: true }]
}

/**
 * @author: Mr.Mao
 * @description: Import eslint rules
 * @module eslint-plugin-import
 */
export const imports: Linter.HasRules['rules'] = {
  'import/first': 'error',
  'import/no-absolute-path': 'error',
  'import/no-unresolved': 'off',
  'import/no-named-as-default': 'off'
}

/**
 * @author: Mr.Mao
 * @description: Unicorn eslint rules
 * @module eslint-plugin-unicorn
 */
export const unicorn: Linter.HasRules['rules'] = {
  'unicorn/better-regex': 'error',
  'unicorn/catch-error-name': 'error',
  'unicorn/consistent-destructuring': 'error',
  // HACK: 规则会导致一些问题
  'unicorn/consistent-function-scoping': 'off',
  'unicorn/custom-error-definition': 'off',
  'unicorn/empty-brace-spaces': 'off',
  // HACK: 可能没这么重要
  'unicorn/error-message': 'error',
  'unicorn/escape-case': 'error',
  // HACK: 使用可能需要查阅文档(https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md)
  'unicorn/expiring-todo-comments': 'error',
  'unicorn/explicit-length-check': 'error',
  'unicorn/filename-case': 'off',
  // TODO: 待测试(https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md)
  'unicorn/import-index': 'error',
  'unicorn/import-style': 'off',
  'unicorn/new-for-builtins': 'error',
  // CONFLICT: eslint-plugin-import
  'unicorn/no-abusive-eslint-disable': 'off',
  // HACK: 可能需要调整(https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md)
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-array-for-each': 'off',
  // HACK: 可能没这么重要
  'unicorn/no-array-method-this-argument': 'off',
  'unicorn/no-array-push-push': 'error',
  // HACK: 可能没这么重要
  'unicorn/no-array-reduce': 'off',
  // HACK: 可能没这么重要
  'unicorn/no-console-spaces': 'error',
  'unicorn/no-document-cookie': 'error',
  'unicorn/no-for-loop': 'error',
  'unicorn/no-hex-escape': 'error',
  'unicorn/no-instanceof-array': 'error',
  'unicorn/no-invalid-remove-event-listener': 'off',
  'unicorn/no-keyword-prefix': 'off',
  'unicorn/no-lonely-if': 'error',
  'unicorn/no-nested-ternary': 'error',
  'unicorn/no-new-array': 'off',
  'unicorn/no-new-buffer': 'off',
  'unicorn/no-null': 'off',
  'unicorn/no-object-as-default-parameter': 'error',
  // HACK: 可能没这么重要
  'unicorn/no-process-exit': 'off',
  'unicorn/no-static-only-class': 'off',
  'unicorn/no-this-assignment': 'error',
  'unicorn/no-unreadable-array-destructuring': 'error',
  'unicorn/no-unsafe-regex': 'off',
  'unicorn/no-unused-properties': 'off',
  'unicorn/no-useless-length-check': 'error',
  'unicorn/no-useless-spread': 'off',
  'unicorn/no-useless-undefined': 'off',
  'unicorn/no-zero-fractions': 'error',
  // CONFLICT: prettier
  'unicorn/number-literal-case': 'off',
  'unicorn/numeric-separators-style': 'error',
  'unicorn/prefer-add-event-listener': 'error',
  'unicorn/prefer-array-find': 'error',
  'unicorn/prefer-array-flat': 'error',
  'unicorn/prefer-array-flat-map': 'error',
  'unicorn/prefer-array-index-of': 'error',
  'unicorn/prefer-array-some': 'error',
  // HACK：API 还未升级
  'unicorn/prefer-at': 'off',
  'unicorn/prefer-date-now': 'error',
  'unicorn/prefer-default-parameters': 'error',
  'unicorn/prefer-dom-node-append': 'error',
  'unicorn/prefer-dom-node-dataset': 'error',
  'unicorn/prefer-dom-node-remove': 'error',
  'unicorn/prefer-dom-node-text-content': 'error',
  'unicorn/prefer-includes': 'error',
  'unicorn/prefer-keyboard-event-key': 'error',
  'unicorn/prefer-math-trunc': 'error',
  'unicorn/prefer-modern-dom-apis': 'error',
  'unicorn/prefer-module': 'off',
  'unicorn/prefer-negative-index': 'error',
  // HACK：可能会造成影响
  'unicorn/prefer-node-protocol': 'off',
  // HACK: 对简洁性产生了影响
  'unicorn/prefer-number-properties': 'off',
  'unicorn/prefer-object-from-entries': 'error',
  'unicorn/prefer-object-has-own': 'error',
  'unicorn/prefer-optional-catch-binding': 'error',
  'unicorn/prefer-prototype-methods': 'error',
  'unicorn/prefer-query-selector': 'error',
  'unicorn/prefer-reflect-apply': 'error',
  'unicorn/prefer-regexp-test': 'error',
  'unicorn/prefer-set-has': 'off',
  'unicorn/prefer-spread': 'error',
  'unicorn/prefer-string-replace-all': 'off',
  'unicorn/prefer-string-slice': 'error',
  'unicorn/prefer-string-starts-ends-with': 'error',
  'unicorn/prefer-string-trim-start-end': 'error',
  'unicorn/prefer-switch': 'error',
  // HACK: 可能会造成影响
  'unicorn/prefer-ternary': 'error',
  'unicorn/prefer-top-level-await': 'off',
  // HACK: 可能没这么重要
  'unicorn/prefer-type-error': 'error',
  // HACK: 可能会造成影响
  'unicorn/prevent-abbreviations': [
    'error',
    {
      ignore: [/param/i, /props/i, /args/i, /prev/i, /ref/i, /dir/i]
    }
  ],
  'unicorn/require-array-join-separator': 'error',
  'unicorn/require-number-to-fixed-digits-argument': 'error',
  // HACK: 可能没这么重要
  'unicorn/require-post-message-target-origin': 'off',
  'unicorn/string-content': 'off',
  // HACK: 可能没这么重要
  'unicorn/throw-new-error': 'error'
}

/**
 * @author: Mr.Mao
 * @description: Typescript eslint rules
 * @module _typescript-eslint/eslint-plugin
 */
export const typescript: Linter.HasRules['rules'] = {
  'no-unused-vars': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/prefer-optional-chain': 'error',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/ban-types': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-extra-semi': 'off'
}
