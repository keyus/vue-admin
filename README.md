# vue-admin
vue + webpack工程，所以整个项目是一个使用vue，单文件组件构建的前端工程,
完整版便是一个vue的后台管理系统。
项目对接后端接口，后端接口采用thinkphp5.x版本写入。

# frontend 前端工程文件


```
cd frontend   #
npm install   #安装依赖
npm run build  #编译文件
npm run start  #运行前端文件
```
### src目录

- api                           #api文件
- components    #组件库
- images        #图片目录
- pug           #多页面模板文件库
- router        #路由
- sass          #样式表
- store         #vuex 状态管理
- utils         #公共方法
- views         #路由视图目录
- app.js        #项目启动js文件
- app.vue       #根组件

###配置前端ajax base url
```
cd frontend/src/api/index.js
```

# api 后端thinkphp 程序文件

```
- api配置，就是基本的thinkphp配置.
- 新建虚拟主机，指向api目录
- 把sql文件 导入数据库.    

- api/app/database.php  修改数据库用户名密码配置
```