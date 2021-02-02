# ogrest
node后端(nestjs) + js前端 全栈框架 前后端共用controller文件 依靠ts跳转定义 在前后端之间自由穿梭
## 安装
`npm i ogrest` 

`yarn add ogrest`

## 使用说明
暂时只支持[nestjs](https://github.com/nestjs/nest) 后续考虑添加其他框架支持
## nestjs
### 后端
装饰器参数请使用字符串而不是变量

如果有 `param` 那么将 `param` 放在 `第一个参数`

保持 `第一个非param参数` 用 `@Body()` 或 `@Query()` 装饰

暂时只支持一个 `param`

请使用示例练习

初次使用示例请到`src/app.module.ts`文件中修改数据库配置 

打开`synchronize`选项以自动生成数据库结构

### 前端

以vue为例 你应该这样进行配置(其他框架更简单 但需要你稍微懂一点webpack)
```js
// vue.config.js
module.exports = {
    chainWebpack(config) {
    config.entry('app').clear().add(path.resolve(__dirname, 'src/vue.main.ts'));
    config.module.rule('ts').use('ogrest').loader('ogrest/loader').end()
  }
}
```
使用 controller 时
```js
import { UserController } from './user/user.controller';
import { wrap } from 'ogrest';
const ctl = wrap(UserController)
```
 

## 开源协议
MIT

