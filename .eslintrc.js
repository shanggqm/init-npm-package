module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // 推荐规则 0="off", 1="warn", 2="error"
    'no-compare-neg-zero': 2,
    'no-cond-assign': 2,
    'no-console': 0, // 不采用 构建时自己去除
    'no-constant-condition': 2, // 采用
    'no-control-regex': 2, // 采用
    'no-debugger': 2, // node端采用，web端不采用
    'no-dupe-args': 2, // 采用
    'no-dupe-keys': 2, // 采用
    'no-duplicate-case': 2, // 采用
    'no-empty': 2, // 采用
    'no-empty-character-class': 2, // 采用
    'no-ex-assign': 2, // 采用
    'no-extra-boolean-cast': 2, // 采用
    'no-extra-parens': 0, // 不采用
    'no-extra-semi': 2, // 采用
    'no-func-assign': 2, // 采用
    'no-inner-declarations': 2, // 采用
    'no-invalid-regexp': 2, // 采用
    'no-irregular-whitespace': 2, // 采用
    'no-obj-calls': 2, // 采用
    'no-regex-spaces': 2, // 采用
    'no-sparse-arrays': 2, // 采用
    'no-unexpected-multiline': 2, // 采用
    'no-unreachable': 2, // 采用
    'no-unsafe-finally': 2, // 采用
    'no-unsafe-negation': 2, // 采用
    'use-isnan': 2, // 采用
    'valid-typeof': 2, // 采用
    'no-case-declarations': 2, // 采用
    'no-empty-pattern': 2, // 采用
    'no-fallthrough': 2, // 采用
    'no-global-assign': 2, // 采用
    'no-octal': 2, // 采用
    'no-redeclare': 2, // 采用
    'no-self-assign': 2, // 采用
    'no-unused-labels': 2, // 采用
    'no-useless-escape': 2, // 采用
    'no-delete-var': 2, // 采用
    'no-undef': 2, // 采用
    // 'no-unused-vars': 2, // 采用
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    // 'typescript/no-unused-vars': ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    'no-mixed-spaces-and-tabs': 2, // 采用
    'constructor-super': 2, // 采用
    'no-class-assign': 2, // 采用
    'no-const-assign': 2, // 采用
    'no-dupe-class-members': 2, // 采用
    'no-new-symbol': 2, // 采用
    'no-this-before-super': 2, // 采用
    'require-yield': 2, // 采用

    // 拓展规则
    'for-direction': 2, // 采用
    'getter-return': 2, // 采用
    'no-await-in-loop': 2, // 采用
    'no-prototype-builtins': 2, // 采用
    'no-template-curly-in-string': 1, // 采用 warning
    // valid-jsdoc 不采用，基础组件强制使用
    'accessor-pairs': 2, // 采用
    'array-callback-return': 2, // 采用
    'block-scoped-var': 2, // 采用
    'class-methods-use-this': 1, //采用（warning，可能报错很多）
    curly: 1, // 采用 warning
    'default-case': 2, // 采用
    eqeqeq: 1, // 采用  warning
    'guard-for-in': 2, // 采用
    'no-caller': 2, // 采用
    'no-eval': 2, // 采用
    'no-extend-native': 2, // 采用
    'no-extra-label': 2, // 采用
    'no-floating-decimal': 2, // 采用
    'no-implied-eval': 2, // 采用
    'no-invalid-this': 2, // 采用
    'no-iterator': 2, // 采用
    'no-labels': 2, // 采用
    'no-lone-blocks': 2, // 采用
    'no-throw-literal': 2, // 采用
    'no-unmodified-loop-condition': 1, // 采用 warning
    'no-useless-concat': 2, // 采用
    'no-useless-return': 2, // 采用
    radix: 2, // 采用
    'require-await': 2, // 采用

    //关于Node.js或在浏览器中使用CommonJS的相关规则
    'callback-return': 0, // 采用
    'global-require': 2, // 采用
    'handle-callback-err': 2, // 采用
    'no-buffer-constructor': 2, // 采用
    'no-mixed-requires': 2, // 采用
    'no-new-require': 2, // 采用

    // 代码风格
    // 在数组开括号后和闭括号前强制换行
    'array-bracket-newline': 0, // 不采用
    // 禁止或强制在括号内使用空格
    'array-bracket-spacing': [2, 'never'], // 采用，禁止在数组括号内出现空格,
    // 强制数组元素间出现换行
    'array-element-newline': 0, // 不采用
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [2, 'always'], // 采用，要求使用一个或多个空格
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [2, '1tbs', { allowSingleLine: true }], // 强制 one true brace style(一种代码风格，将大括号放在控制语句或声明语句同一行的位置)
    // 可以有例外情况, allowSingleLine允许块的开括号和闭括号在 同一行
    // 要求使用骆驼拼写法
    camelcase: [2, { properties: 'never' }], // 采用，但不检查属性名称
    // 强制或禁止对注释的第一个字母大写
    'capitalized-comments': 0, // 不采用
    // 要求或禁止使用拖尾逗号
    'comma-dangle': [
      0,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline'
      }
    ], // 采用，当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号。
    // 强制在逗号周围使用空格
    'comma-spacing': [2, { before: false, after: true }], // 采用，禁止在逗号前使用空格，要求在逗号后使用一个或多个空格
    // 逗号风格
    'comma-style': [
      2,
      'last',
      {
        // last 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
        exceptions: {
          // 额外规则 包含与 JavaScript 代码的抽象语法树 (AST) 的节点类型对应的属性：
          ArrayExpression: false, // 忽略数组字面量的逗号风格
          ArrayPattern: false, // 忽略数组的解构赋值语句中的逗号风格
          ArrowFunctionExpression: false, // 忽略箭头函数表达式的参数中的逗号风格
          CallExpression: false, // 忽略函数调用的参数中的逗号风格
          FunctionDeclaration: false, // 忽略函数声明的参数中的逗号风格
          FunctionExpression: false, // 忽略函数表达式的参数中的逗号风格
          ImportDeclaration: false, // 忽略 import 语句中的逗号风格
          ObjectExpression: false, // 忽略对象字面量的逗号风格
          ObjectPattern: false, // 忽略对象的解构赋值中的逗号风格
          VariableDeclaration: false, // 忽略变量声明的逗号风格
          NewExpression: false //  忽略构造函数表达式参数中的逗号风格
        } // !!! 注意，以上配置全为false，即不忽略
      }
    ], // 采用
    // 禁止或强制在计算属性中使用空格
    'computed-property-spacing': [2, 'never'], // 采用，禁止在计算属性内使用空格
    // 要求一致的 This
    'consistent-this': 0, // 不采用
    // 要求或禁止文件末尾保留一行空行
    'eol-last': [2, 'always'], // 采用 强制使用换行 (LF)
    // 要求或禁止在函数标识符和其调用之间有空格
    'func-call-spacing': [2, 'never'], // 禁止在函数名和开括号之间有空格
    // 要求函数名与赋值给它们的变量名或属性名相匹配
    'func-name-matching': 0, // 不采用
    // 要求或禁止命名的 function 表达式
    'func-names': 1, // 警告
    // 强制 function 声明或表达式的一致性
    'func-style': 0, // 不采用
    // 强制在函数括号内使用一致的换行
    'function-paren-newline': [2, 'consistent'], // 采用, 要求每个括号使用一致的换行。如果一个括号有换行，另一个括号没有换行，则报错。
    // 禁止使用指定的标识符
    'id-blacklist': 0, // 不采用
    // 强制标识符的最小和最大长度
    'id-length': 0, // 不采用
    // 要求标识符匹配一个指定的正则表达式
    'id-match': 0, // 不采用
    // 强制隐式返回的箭头函数体的位置
    'implicit-arrow-linebreak': [2, 'beside'], // 采用 禁止在箭头函数体之前出现换行
    // 强制使用一致的缩进
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild'
        ],
        ignoreComments: false
      }
    ], // 采用 一般2个缩进,特殊语句见配置
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': 0, // 不采用
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [2, { beforeColon: false, afterColon: true }], // 采用， 禁止在对象字面量的键和冒号之间存在空格，要求在对象字面量的冒号和值之间存在至少有一个空格
    // 强制在关键字前后使用一致的空格
    'keyword-spacing': [
      2,
      {
        before: true, // 要求在关键字之前至少有一个空格
        after: true, // 要求在关键字之后至少有一个空格
        overrides: {
          // 允许覆盖指定的关键字的空格风格
          return: { after: true },
          throw: { after: true },
          case: { after: true }
        }
      }
    ], // 采用
    // 强制行注释的位置
    'line-comment-position': 0, // 不采用
    // 强制使用一致的换行风格
    'linebreak-style': [2, 'unix'], // 采用，强制使用 Unix 换行符： \n。
    // 要求在注释周围有空行
    'lines-around-comment': 0, //不采用
    // 要求或禁止类成员之间出现空行
    'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: false }], // 采用
    // 强制可嵌套的块的最大深度
    'max-depth': 0, // 不采用
    // 强制一行的最大长度
    'max-len': [
      2,
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ], // 采用，最长100，tab字符宽度为2
    // 强制最大行数
    'max-lines': 0, // 不采用
    // 强制回调函数最大嵌套深度
    'max-nested-callbacks': 0, // 不采用
    // 强制函数定义中最多允许的参数数量
    'max-params': 0, //不采用
    // 强制函数块最多允许的的语句数量
    'max-statements': 0, // 不采用
    // 强制每一行中所允许的最大语句数量
    'max-statements-per-line': 0, // 不采用
    // 强制对多行注释使用特定风格
    'multiline-comment-style': 0, // 不采用
    // 要求或禁止在三元操作数中间换行
    'multiline-ternary': 0, // 不采用
    // 要求构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true, // 要求调用 new 操作符时有首字母大小的函数
        newIsCapExceptions: [],
        capIsNew: false, // 要求调用首字母大写的函数时有 new 操作符
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'] // 允许调用指定的首字母大写的函数时没有 new 操作符
      }
    ], // 采用
    // 要求调用无参构造函数时有圆括号
    'new-parens': 2, // 采用
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': [2, { ignoreChainWithDepth: 4 }], // 允许在同一行成链的深度为4
    // 禁用 Array 构造函数
    'no-array-constructor': 2, // 采用
    // 禁用按位运算符
    'no-bitwise': 2, // 采用
    // 禁用 continue 语句
    'no-continue': 2, // 采用
    // 禁止在代码后使用内联注释
    'no-inline-comments': 0, // 不采用
    // 禁止 if 作为唯一的语句出现在 else 语句中
    'no-lonely-if': 2, // 采用
    // 禁止混合使用不同的操作符
    'no-mixed-operators': [
      2,
      {
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['**', '+'],
          ['**', '-'],
          ['**', '*'],
          ['**', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: false
      }
    ], // 采用
    // 禁止连续赋值
    'no-multi-assign': 2, // 采用
    // 禁止出现多行空行
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0 }], // 采用
    // 禁用否定的表达式
    'no-negated-condition': 0, // 不采用
    // 禁用嵌套的三元表达式
    'no-nested-ternary': 2, // 采用
    // 禁用 Object 的构造函数
    'no-new-object': 2, // 采用
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 2, // 采用
    // 禁用特定的语法
    'no-restricted-syntax': [
      2,
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ], // 采用
    // 禁用 tab
    'no-tabs': 2, // 采用
    // 禁用三元操作符
    'no-ternary': 0, //不采用
    // 禁用行尾空格
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: false,
        ignoreComments: false
      }
    ], // 采用
    // 禁止标识符中有悬空下划线
    'no-underscore-dangle': [
      2,
      {
        allow: [],
        allowAfterThis: false,
        allowAfterSuper: false,
        enforceInMethodNames: false
      }
    ], // 采用
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': [2, { defaultAssignment: false }],
    // 禁止属性前有空白
    'no-whitespace-before-property': 2, //采用
    // 强制单个语句的位置
    'nonblock-statement-body-position': [2, 'beside', { overrides: {} }], // 采用
    // 强制大括号内换行符的一致性
    'object-curly-newline': [
      2,
      {
        ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
        ExportDeclaration: { minProperties: 4, multiline: true, consistent: true }
      }
    ], // 采用
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': [2, 'always'], // 采用
    // 强制将对象的属性放在不同的行上
    'object-property-newline': [
      2,
      {
        allowAllPropertiesOnSameLine: true
      }
    ],
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [2, 'never'], // 采用, 要求每个作用域有多个变量声明
    // 要求或禁止在变量声明周围换行
    'one-var-declaration-per-line': [2, 'always'], // 采用，强制每个变量声明都换行
    // 要求或禁止在可能的情况下使用简化的赋值操作符
    'operator-assignment': [2, 'always'], //采用，要求尽可能地简化赋值操作
    // 强制操作符使用一致的换行符
    'operator-linebreak': [0, 'before', { overrides: { '=': 'none' } }], // 采用, 要求把换行符放在操作符前面
    // 要求或禁止块内填充
    'padded-blocks': [2, { blocks: 'never', classes: 'never', switches: 'never' }], // 采用
    // 要求或禁止在语句间填充空行
    'padding-line-between-statements': 0, // 不采用
    // 要求对象字面量属性名称用引号括起来
    'quote-props': [2, 'as-needed', { keywords: false, unnecessary: true, numbers: false }], //采用
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [2, 'single', { avoidEscape: true }], // 采用
    // 要求使用 JSDoc 注释
    'require-jsdoc': 0, // 不采用
    // 要求或禁止使用分号代替 ASI
    semi: [2, 'always'], // 采用,要求在语句末尾使用分号
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': ['error', { before: false, after: true }], // 采用
    // 强制分号的位置
    'semi-style': [2, 'last'], // 采用，强制分号出现在句子末尾。
    // 要求对象属性按序排列
    'sort-keys': 0, // 不采用
    // 要求同一个声明块中的变量按顺序排列
    'sort-vars': 0, // 不采用
    // 强制在块之前使用一致的空格
    'space-before-blocks': 2, // 采用
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': [
      2,
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ], // 采用
    // 强制在圆括号内使用一致的空格
    'space-in-parens': [2, 'never'], // 采用，强制圆括号内没有空格
    // 要求操作符周围有空格
    'space-infix-ops': 2, // 采用
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false,
        overrides: {}
      }
    ], // 采用
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': [
      2,
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'] // space here to support sprockets directives
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'], // space here to support sprockets directives
          balanced: true
        }
      }
    ], // 采用
    // 强制在 switch 的冒号左右有空格
    'switch-colon-spacing': [2, { after: true, before: false }], // 采用
    // 要求或禁止在模板标记和它们的字面量之间有空格
    'template-tag-spacing': [2, 'never'], // 禁止在一个标记的函数和它的模板字面量之间有空格
    // 要求或禁止 Unicode 字节顺序标记 (BOM)
    'unicode-bom': [2, 'never'], // 采用
    // 要求正则表达式被括号括起来
    'wrap-regex': 0 // 不采用
  }
};
