# vue-kashi-contest

> 使用vue搭建的关于2018年首届“喀什市旅游手信”设计大赛的项目

# vue-kashi-contest
> 使用vue搭建的关于2018年首届“喀什市旅游手信”设计大赛的项目

# 技术栈
vue2 + vue-router + less + ES6/ES7 + webpack + axios

# 提示
>  npm install    安装依赖
>  npm run dev    运行
>  npm run build  打包

# 目录结构

* api
    *  api.js         公共接口
    *  enroll.s      每个vue页面对应使用的接口
* assets
    *  font              字体
    *  img                  图片
    *  json                json数据
    *  style                样式
* components
    *  dialog                
        *  dialog           弹窗
    *  error                
        *  error-notfound           404页面
    *  footed                
        *  footed-tab           底部tab栏
    *  header                
        *  header           头部导航栏
    *  list                
        *  list-box           公共列表页面
* router          路由配置
* tools
    *  common              常用的工具
    *  http                  二次封装axios
    *  wxShare                微信分享配置，暂未实现
* views
    *  awards                
        *  Awards           弹窗
    *  enroll                
        *  Enroll           404页面
    *  introduce                
        *  Introduce           底部tab栏
* global          定义公共变量 
* server          服务器配置 
