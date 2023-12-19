# 初始化环境

```bash
# 创建项目, 会提示安装 create-vue ，Y 继续
npm init vue@latest
# 交互环境
✔ Project name: … DuCMS
✔ Package name: … ducms
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
# 手动安装
✔ Add Vue Router for Single Page Application development? … No / Yes
# 手动安装
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No / Yes
# 保存时自动格式化
✔ Add Prettier for code formatting? … No / Yes

# 完成后进入项目并安装依赖
cd DuCMD && npm install
```

## 项目文件介绍

- `.vscode`: 下面有个 extensions.json，里面推荐了需要在 vscode 安装的插件，需要都装上
- public: 存放静态资源
- src: 源代码
- env.d.ts：类型声明文件, 默认引用了 vite 源码定义的一系列静态 module
- index.html: 入口模板文件, 可配置 ico 和 title
- tsconfig.json 是 ts 读取的入口，分别引用了如下两个文件：
  - tsconfig.node.json：基于 node 运行 SSR 以及 vite 打包相关的配置
  - tsconfig.app.json：默认定义了一些选项，其它大部分继承自 vue 源码中的 tsconfig

# 插件

## 代码生成器

以 vuets 片段举例，先编写需要生成的代码的模板：

```vue
<template>
  <div class="${1:home}">
    <h2>${1:home}</h2>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.${1:home}{
        
}
</style>
```

- ${1:home} 表示生成代码后，将光标选中所有的该变量引用，方便一键替换
- 将该代码粘贴至 `https://snippet-generator.app/` 生成对应 ide 的代码片段
- 将代码片段粘贴至 vscode -> settings -> user snippet -> vue.json

# 代码规范

## 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。虽说大部分功能被 prettier 替代了，但仍有其地位

在项目根目录创建 `.editorconfig` 文件，内容如下：

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

VSCode 需要安装一个插件：`EditorConfig for VS Code`

## 使用 prettier 工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装prettier

```shell
npm install prettier -D
```

2.配置 `.prettierrc` 文件：

- useTabs：使用tab缩进还是空格缩进，选择false；
- tabWidth：tab是空格的情况下，是几个空格，选择2个；
- printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
- singleQuote：使用单引号还是双引号，选择true，使用单引号；
- trailingComma：在多行输入的尾逗号是否添加，设置为 `none`，比如对象类型的最后一个属性后面是否加一个，；
- semi：语句末尾是否要加分号，默认值true，false表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3.创建 `.prettierignore` 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode需要安装 `Prettier - Code formatter` 插件

5.VSCod中的配置

- settings => format on save => 勾选上
- settings => editor default format => 选择 prettier - Code formatter

  6.测试prettier是否生效

* 测试一：在代码中保存代码；
* 测试二：配置一次性修改的命令；

在package.json中配置一个scripts：

```json
    "prettier": "prettier --write ."
```

## 使用 ESLint 检测

1.在前面创建项目的时候，我们就选择了 `ESLint`，所以Vue会默认帮助我们配置需要的 `ESLint` 环境。

2.VSCode需要安装 `ESLint` 插件：

3.解决 `eslint` 和 `prettier` 冲突的问题：

安装插件：（vue在创建项目时，如果选择 prettier，那么这两个插件会自动安装）

```shell
# 新版本 vue 自带有这两插件
npm install eslint-plugin-prettier eslint-config-prettier -D
```

在 `.eslintrc.cjs` 添加 `prettier` 插件, 使其和 prettier 风格一致

```json
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:prettier/recommended'
  ]
```

在 eslintrc 中配置对某个规则的跳过

```js
// 比如某个报错：Component name "login" should always be multi-word.eslint（vue/multi-word-component-names）, 复制括号中的规则名
parserOptions: {
  ecmaVersion: 'latest'
},
// 忽略指定的错误,在规则中指定 eslint 规则文件
rules: {
  'vue/multi-word-component-names': 'off'
}
```



5.VSCode 中 eslint 的配置(在 vue 中用不上)

```json
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```

# 代码相关

## css 样式重置

```bash
# 安装包
npm install normalize.css
```

main.ts 导入包

```ts
import 'normalize.css'
import './assets/css/index.less'
```

编辑 src/css 下的文件

```js
// index.less
@import './reset.less'
@import './common.less'

// reset.less
网上找代码
```

另外 less 文件需要安装包

```bash
npm install less -D
```

操作完成后就发现文本已顶边显示在左上角

## Vue 相关

___

### vue 模块类型声明

在默认情况下，`import App from './App.vue'` 应该是会报错的,因为没有对 vue 文件做类型声明，没有报错是因为安装了 `TypeScript Vue Plugin (Volar)` 插件，因此需要在 `env.d.ts` 文件下声明 vue 模块类型

把 ts vue plugin 禁用掉，就能正确的显示 vue 组件的类型了

```ts
declare module '*.vue' {
  // DefineComponent 是 defineComponent 函数的返回类型，该函数的作用就是处理逻辑后 export 组件对象
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
```

## vue-router

```shell
# 安装
npm install vue-router
```

如果初始化项目选择了 router，会帮我们在入口文件自动 use(router)，这里手动引入即可

## vue-pinia

```bash
# 安装
npm install pinia
```

# 接口文档

接口文档v1版本：

https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL的值：

```
http://152.136.185.210:5000
http://152.136.185.210:4000
```

设置全局token的方法：

```js
const res = pm.response.json();
pm.globals.set("token", res.data.token);
```

接口文档v2版本：（有部分更新）

https://documenter.getpostman.com/view/12387168/TzzDKb12
