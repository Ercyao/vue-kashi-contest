# jw

> 2018年首届“喀什市旅游手信”设计大赛


## Build Setup

``` bash
安装依赖
npm install

运行
npm run dev

打包编译
npm run build

```

# 关于规范的格式

>  method 自定义方法命名:

>  动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）

>  axios 方法以 get、post 开头，以 Api 结尾（getListApi、postFormApi）

>  事件方法以 on 开头（onTypeChange、onUsernameInput）

>  init、refresh 单词除外

>  尽量使用常用单词开头（set、get、open、close、jump）

>  驼峰命名（getListData）

···

>  文件夹自定义命名:

>  动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）

>  axios 方法以 get、post 开头，以 Api 结尾（getListApi、postFormApi）

>  事件方法以 on 开头（onTypeChange、onUsernameInput）

>  init、refresh 单词除外

>  尽量使用常用单词开头（set、get、open、close、jump）

>  驼峰命名（getListData）

>  views下的文件夹自定义命名：

> 根据代表着模块的名字命名

> 由名词组成（car、order、cart） 

> 单词只能有一个（good: car order cart）（bad: carInfo carpage） 

> 尽量是名词（good: car）（bad: greet good） 

> 以小写开头（good: car）（bad: Car） 

> views下的 vue 文件自定义命名：

> views 下的 vue 文件代表着页面的名字 ，放在模块文件夹之下 

> 只有一个文件的情况下不会出现文件夹，而是直接放在 views 目录下面，如 Login Home 

> 尽量是名词 

> 大写开头，开头的单词就是所属模块名字（CarDetail、CarEdit、CarList） 

> 名字至少两个单词（good: CarDetail）（bad: Car） 

> 常用结尾单词有（Detail、Edit、List、Info、Report） 

> 以 Item 结尾的代表着组件（CarListItem、CarInfoItem）

---------------------

本文来自 一滴墨 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/Care_about/article/details/75645563?utm_source=copy 


## vue 方法放置顺序
```
	components
	
	props
	
	data
	
	created
	
	mounted
	
	activited
	
	update
	
	beforeRouteUpdate
	
	metods
	
	filter
	
	computed
	
	watch
	
```



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
