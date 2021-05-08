const http = require('http');   //node集成commonjs的require加载模块
const fs = require('fs')
const path=require('path')
const server = http.createServer((req, res) => {
    // res.writeHead(200, {'Content‐Type': 'text/plain'});
    console.log(req.url)
    console.log('客户端有人请求了')
    // res.write('<head><meta charset="utf-8"/></head> <h1>邢浩东的node的http服务</h1>');

    let content
    let url = req.url;
    //判断当前请求的地址是什么；返回相应的文件---文件多了switch循环判断就太麻烦了

    // switch (req.url) {
    //     case '/':
    //         content = fs.readFileSync('08node2/01http.html')
    //         break;
    //     case '/01http.css':
    //         content = fs.readFileSync('08node2/01http.css')
    //         break;
    //     default:
    //         content = ''
    // }



    // if (url.startsWith('/mouse')) {
    //     url=url.replace(/^\/mouse/g, '/01static')
    //     console.log(url)
    //     content = fs.readFileSync(path.join(__dirname + url))
    // } else {
    //     content = fs.readFileSync('08node2/01http.html')
    // }


    //404页面设置
    try {
        content = fs.readFileSync(path.join(__dirname + url))
        res.writeHead(200,{
            contentType:'text/html;charset=utf-8'
        })
        
    } catch (error) {
        console.log(error)
        content = fs.readFileSync('08node2/01static/404.html')

        res.writeHead(404,{
            contentType:'text/html;charset=utf-8'
        })
    }
    

    res.write(content)
    res.end()
})




server.listen(8081, () => {
    console.log('服务器开启成功 http://localhost:8081')
})



//npm install nodemon -g  全局安装nodemon热更新
//nodemon 08node2/01http.js  启动服务