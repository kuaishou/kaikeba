//立即执行函数



//函数声明
function tsest() {
    console.log('函数声明')
}

//函数表达式
var testr = function () {
    console.log('函数表达式')
}


//执行函数
tsest()
testr()

//函数声明不能立即执行；只有下面表达式函数才能立即执行
// function tsest() {
//     console.log('函数声明立即执行')
// }()
var testr1 = function () {
    console.log('函数表达式立即执行')
}();

    //w3c推荐下面的立即执行函数(所有立即执行函数前加；号进行隔离)
;(function () {
    console.log('函数声明立即执行2')
})()
;(function () {
    console.log('函数声明立即执行3')
}())