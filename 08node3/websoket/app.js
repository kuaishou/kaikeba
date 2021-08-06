const http = require('http');   //node集成commonjs的require加载模块
const Koa=require('koa')
const Io=require('socket.io')
const KoaStaticCache=require('koa-static-cache')
// const path=require('path')


const app =new Koa()

app.use(KoaStaticCache('./public',{
    prefix:'/public',
    gzip:true,
    dynamic:true
}))

const server = http.createServer(app.callback())

const option={};

//io库接收的原始http对象上面的server对象
const io=Io(server,option)

io.on('connection',socket=>{//链接事件
    console.log('有人链接了')
//emit注册事件方便客户端调用
//on调用客户点注册的事件

    //通知当前的socket
    socket.emit('hello',`欢迎你${socket.id}`)

    //广播事件给所有链接 给所有的socket
    socket.broadcast.emit('hello',`欢迎新的小伙子${socket.id}加入；欢迎他`)

     //通知当前的socket
     socket.on('message',data=>{
        console.log('有人发信息了',data)
        socket.broadcast.emit('message',`${socket.id}说:${data}`)
     })
})


server.listen(8081, () => {
    console.log('服务器开启成功 http://localhost:8081')
})



//npm install nodemon -g  全局安装nodemon热更新
//nodemon 08node3/websocket/app.js  启动服务