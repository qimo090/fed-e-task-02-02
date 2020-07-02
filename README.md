Part 2 | Mod 2

# 一、简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再**递归**本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

不同：

- loader

  主要用于模块代码的转化，因为 webpack 原生只识别 js 和 json 格式的文件，其他格式的文件需要通过对应的 loader 进行转化，使 webpack 能被识别并进行处理

- plugin

  解决 loader 无法实现的其他事，从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。

开发：

- loader

  loader 在我看来就是一个管道，文件内容通过一个个 loader 管道进行处理
  最简单的 loader 如下，文件代码流进来，经过某些处理再返回出去，交给下一个 loader

  ```js
  module.exports = function (source) {
    // source 为 compiler 传递给 Loader 的一个文件的原内容
    // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该`Loader`没有做任何转换
    return source
  }
  ```

- plugin

  plugin 其实就是一个类，它需要实现一个 apply 方法，apply 方法的第一个参数是 compiler
  一个最简单的 plugin 如下

  ```js
  class BasicPlugin {
    // 在构造函数中获取用户给该插件传入的配置
    constructor(options) {}

    // Webpack 会调用 BasicPlugin 实例的 apply 方法给插件实例传入 compiler 对象
    apply(compiler) {
      compiler.plugin('compilation', function (compilation) {})
    }
  }
  // 导出 Plugin
  module.exports = BasicPlugin
  ```

# 二、编程题

## 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

    先下载任务的基础代码：https://github.com/lagoufed/fed-e-001/raw/master/tasks/02-02-base-code.zip
    这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
    有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
    这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
    尽可能的使用上所有你了解到的功能和特性

作业要求

    本次作业的中的编程题要求大家完成相应代码过后，录制一个小视频简单介绍一下实现思路，演示一下相应功能。最终将录制的视频和代码统一提交至作业仓库。
