//stream   流       把文件切成小块  buffer 节省带宽

const fs=require('fs')

// let rs=fs.readFileSync('08node/fs1.txt')
// console.log(rs.toString())

//createReadStream相比上面的readFileSync效率更高
let rs=fs.createReadStream('08node/fs1.txt')
rs.on('data',(res)=>{
    console.log(res.toString())
})

//流结束
// rs.on('end',(res)=>{
//     console.log(res)
// })

