module.exports = {
    printWidth: 80, // 單行長度
    tabWidth: 2, // 縮進長度
    useTabs: false, // 使用空格代替 tab 縮進
    semi: true, // 句末使用分號
    singleQuote: true, // 使用單引號
    quoteProps: 'as-needed', // 仅在必需时为对象的 key 添加引号
    jsxSingleQuote: true, // JSX 中使用單引號
    trailingComma: 'all', // 多行时尽可能打印尾隨逗號
    bracketSpacing: true, // 在对象前后添加空格-例如：{ foo: bar }
    jsxBracketSameLine: true, // 多属性 HTML 标签的 '>' 折行放置
    arrowParens: 'always', // 單參數箭頭函數參數周圍使用圓括號-例如：(x) => x
    requirePragma: false, // 無需頂部註釋即可格式化
    insertPragma: false, // 在已被 Prettier 格式化的文件頂部加上標註
    proseWrap: 'preserve', // 不知道怎麼翻譯
    htmlWhitespaceSensitivity: 'ignore', // 對 HTML 全局空白不敏感
    vueIndentScriptAndStyle: false, // 不對 Vue 中的 <script> 及 <style> 標籤縮進
    endOfLine: 'lf', // 結束行形式
    embeddedLanguageFormatting: 'auto', // 對引用代碼進行格式化
};
