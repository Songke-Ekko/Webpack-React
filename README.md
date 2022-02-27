①: This is My first React + Webpack + react-dev-utils Demo

②: I use Three methods to start or launch This project:
（1）: React + webpack + webpack-cli
（2）: React + webpack + webpack-dev-server + scripts/start [中间件：webpack-dev-middleware]
（3）: React + webpakc + webpack-dev-server + scripts/start [中间件：react-dev-utils]

 // This is my problem and solutions when I start this project:
 注意问题:
 (1) The first problem is the most serious question of the [npm]: The Version Question.
 So I list the usable version of a whole react project‘s required plugins.
 It is similar to the React-Family-Meals.

 version4: webpack@4.16.5
            webpack-cli@3.3.11
            webpack-dev-server@3.3.0
            react-dev-utils@6.1.1
            react-router-dom@4.2.2
            react-redux@5.0.6
            babel-core@6.26.3
            babel-loader@7.1.5
            babel-plugin-import@1.7.0
            babel-preset-env@1.7.0
            babel-preset-es2015@6.24.1
            babel-preset-react@6.24.1

 version5: webpack@5
            webpack-cli@4
            webpack-dev-server@4

 （2）Webpack -> module -> loaders 已经废弃掉，webpack@4 之后统一写成 rules
 （3）Webpack -> resolve 用来配置 webpack 如何解析模块，这样可以省略后缀名
 （4）Webpack -> babel-loader 要配合 .babelrc 使用或者在 use 里写 presets
 （5）热更新可以直接在 DerServer 写 hot: true，但是启动命令行里要写 --hot: 
    webpack-dev-server --hot 
 （6）HtmlWebpackPlugin 可以帮助你简化 HTML 文件的创建，以便你为你的 webpack 包提供服务，一定要配置


③: css-loader，style-loader，postcss-loader，scss-loader，less-loader
（1）css-loader: 可以使你能够使用类似 @import 和 url(...) 的方法实现 require() 的功能
（2）style-loader: 将所有的计算后的样式加入页面中，简化就是将 css 注入 DOM，与 css-loader 组合在一起，使你能够把样式嵌入 webpack 打包后的 JS 文件中
（3）postcss-loader: 将 css3 转为低版本的浏览器兼容写法，以及兼容未来版本的 css 写法，也就是加入 -webkit- 这样的语法
（4）sass-loader: 将 sass -> css
（5）less-loader: 将 less -> css


④: Webpack 打包以及启动如何更加快速：
（1）dev-tool: 提供开发人员的调试，同时会影响打包速度
   1 source-tool: 产生一个单独的 source-map 文件，功能最完全，但是会减慢打包速度。
   2 eval-source-map: 使用 eval 打包源文件模块，直接在源文件中写入干净完成的 source-map，不影响构建速度，但是影响执行速度和安全，建议在开发环境中使用，生产环境不要使用。
   3 cheap-eval-source-map: 转换代码（行内），每个模块被 eval 执行，并且 sourcemap 作为 eval 的一个 daraUrl。
   4 cheap-module-source-map: 会产生一个不带映射到列的单独的 map 文件，开发者工具就只能看到行，但无法对应到具体的列（符号），对调试不便。
   5 cheap-module-eval-source-map: 不会产生单独的 map 文件，但开发者工具就只能看到行，但是无法对应到具体的列（符号），对调试不便。

   生产环境可以直接用 false，开发环境可以 cheap-eval-source-map
（2）module -> rules 里每个用 include 替换 exclude 加快 webpack 搜索速度。
（3）module -> rules -> use -> options -> plugin 加 cacheDirectory 缓存 babel 加快 webpack 编译速度，同时实现第三方库的按需加载，需要引入 babel-plugin-import
（4）noParse: 可以让 Webpack 忽略对部分没有采用模块化的文件的递归解析和处理，提高构建性能