const fs = require('fs');   //文件操作模块
//增
//删
//改
//查
//文件操作、目录操作
// fs.writeFile('08node/fs.txt','邢浩东创建的txt文件',function(err){
//     if(err){
//         return console.log('创建失败')
//     }
//     console.log('创建成功')
// })

// fs.readFile('08node/fs.txt','utf8',function(err,data){
//     if(err){
//         return console.log('读取失败')
//     }
//     console.log(data)
// })

// fs.rename('08node/fs.txt','08node/fs1.txt',function(err){
//     if(err){
//         return console.log('修改名字失败',err)
//     }
//     console.log('修改名字成功')
// })

// fs.unlink('08node/1.txt',function(err){
//     if(err){
//         return console.log('删除文件失败',err)
//     }
//     console.log('删除文件成功')
// })

// fs.copyFile('08node/fs1.txt','08node/myfs.txt',function(err){
//     if(err){
//         return console.log('复制文件失败',err)
//     }
//     console.log('复制文件成功')
// })

//判断文件或目录是否存在
// fs.exists('08node/fs1.txt',function(exists){
//     console.log(exists)
// })



//npm install nodemon -g  全局安装nodemon热更新
//nodemon 08node/fs.js  启动服务