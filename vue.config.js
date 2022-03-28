module.exports = {
    pages: {
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`。
        // 输出文件名会被推导为 `subpage.html`。
        index: 'src/index/main.js',
        newTask: 'src/newTask/main.js',
        about: 'src/about/main.js',
      }
}