require('./index')
require('./a')
const http = require('http');   //node集成commonjs的require加载模块
const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content‐Type': 'text/plain'});
    res.write('<head><meta charset="utf-8"/></head> 邢浩东的node的http服务');
    res.end()
})
server.listen(3000)



//npm install nodemon -g  全局安装nodemon热更新
//nodemon 08node/http.js  启动服务