//node模板语法学习  pug模板


//安装npm i koa koa-router koa-views pug -S
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
let app = new Koa()
let router = new Router()
app.use(views(__dirname + '/views'), {
    map: {
        html: 'png'
    }
})
router.get('/', async ctx => {
    //console.log(ctx)
    await ctx.render('index.pug',{
        data:'变量数据'
    })
    // ctx.body='hello'
})
app.use(router.routes())//router.routes()中间件函数只要访问就执行
app.listen(3000)

//nodemon 08node/pug/index.js   启动服务监听3000端口 
