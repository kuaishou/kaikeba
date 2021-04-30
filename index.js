import obj from "./inff/a";

console.log(null==undefined)   //true
console.log(null==false)   //false
console.log(null==0)   //false
console.log(false==0)   //true
let num;
console.log(num + 1)   //NaN

function fun(obj ? ...Object.assign({a:123,b:456},obj) : ...{a:1,b:2}){
    return {a,b}
}
fun()