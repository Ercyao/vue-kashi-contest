## vue-kashi-contest
 使用vue搭建的关于2018年首届“喀什市旅游手信”设计大赛的项目
 ( https://ercyao.github.io/vue-kashi-contest/contest/index.html )


## 技术栈
vue2 + vue-router + less + ES6/ES7 + webpack + axios


## 开发构建步骤

``` bash
# 全局安装 yarn
$ npm install yarn --global

# 依赖所有安装
$ yarn install

# 开发模式
$ yarn dev

# 构建项目
$ yarn build

http://localhost:8880
```


### 效果图

![效果图](https://github.com/Ercyao/vue-kashi-contest/blob/master/src/assets/img/GIF.gif)



### 目录结构

* api
    *  api.js         公共接口
    *  http           二次封装axios
* assets
    *  font              字体
    *  img               图片
    *  json              json数据
    *  style             样式
* components
    *  dialog                
        *  dialog               弹窗
    *  error                
        *  error-notfound       404页面
    *  footed                
        *  footed-tab           底部tab栏
    *  header                
        *  header               头部导航栏
    *  list                
        *  list-box             公共列表页面
* router          路由配置
* tools
    *  common                常用的工具
    *  wxShare               微信分享配置
* views           页面
* global          定义公共变量 
* server          服务器配置 
