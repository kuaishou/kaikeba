    webpack模块化

1、common.js
2、AMD（require、）
3、UMD

es6原生支持模块化

异步加载
export call
export defalt {call}
import {call} from a.js


commonJs    nodejs主要集成commonJs
同步加载    主要是后端，因为集成了太多东西了
module.exports.call=call
const call=require("./a.js")
call()

define(['jquery', './a.js'], function ($,call) {

})



webpack是用node执行的可以生成删除等操作文件操作
node最多的应用场景就是中间件或者辅助性工具例如webpack、vue-cli等  大公司用node做webserver比较少




