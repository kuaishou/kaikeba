//jquery库封装

class Jquery{
    constructor(arg){
        if(typeof arg==='function'){
            window.addEventListener('DOMContrntLoaded',arg);
        } else if (typeof arg==='string'){//标签名--ID class 类
            let eles=document.querySelectorAll(arg)
            for (let i=0;i< eles.length;i++){
                this[i]=eles[i]
            }
            this.length=eles.length
        }else{//对象
            if(typeof arg.length==='undefined'){
                this[0]=arg
                this.length=1
            }else{
                for (let i=0;i< arg.length;i++){
                    this[i]=arg[i]
                }
                this.length=arg.length
            }
        }
       
    }
    css(...args){//不定参数-----width，100px形式和{width:100px}形式
        //1、获取css样式
        //2、设置css样式width，100px形式
        //3、设置css样式{width:100px}形式
        

    }
    getStyle(){

    }
    getStyle(){

    }
    eq(index){
        return new Jquery(this[index])
    }
    on(eventName,fn){
        let eventarr=eventName.split(' ')//绑定多个事件
        for (let i=0;i< this.length;i++){
            for (let j=0;j< eventarr.length;j++){
                this[i].addEventListener(eventarr[i],fn)
            }
        }
    }
    click(fn){
        for (let i=0;i< this.length;i++){
            this[i].addEventListener('click',fn)
        }
    }
}


function $(arg){
  return  new Jquery(arg)
}



