//方法二；wather和依赖收集器    不依赖key值生成对应的dep
//get收集依赖；set发布  

class MyVue{
    constructor(options){
        this.$options=options;
        this.$data=options.data;
        this.observe(this.$data)
        this.compile()
    }
    observe(data){//使用difinepeoperty实现数据对象监听----观察数据，劫持数据
        Object.keys(data).forEach(key=>{
            let value=data[key]//先保存起来防止下面defineProperty的调用进入死循环
            let _this=this
            let dep=new Dep()
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){//get收集依赖；set发布  
                    console.log('get数据',value)
                    if(Dep.target){
                        dep.addSub(Dep.target)
                    }
                    return value
                },
                set(newVal){//set发布  触发对应的update方法
                    console.log('set数据',value)
                    dep.notify(newVal)
                    value=newVal
                }
            })
        })
        
    }
    compile(){
        let ele=document.querySelector(this.$options.el)
        this.compileChildnodes(ele)
    }
    compileChildnodes(ele){
        let childNodes=ele.childNodes;
        let reg=/\{\{\s*([^\{\}\s]+)\s*\}\}/g
        childNodes.forEach(node => {
            let textContent=node.textContent;
            if(node.nodeType===3){
                if(reg.test(textContent)){
                    let $1=RegExp.$1
                    // console.log(this.$data[$1])
                    new Watcher(this.$data,$1,(newval)=>{
                        let oldVal=this.$data[$1]
                        let reg=new RegExp(oldVal)
                        node.textContent=node.textContent.replace(reg,newval)
                    })
                    node.textContent=node.textContent.replace(reg,this.$data[$1])
                }
            }else if(node.nodeType===1){
                //处理input双向数据绑定问题




                if(node.childNodes.length>0){
                    this.compileChildnodes(node)
                }
            }
        });
    }
}

//依赖收集器；
class Dep{
    constructor(){
        this.subs=[]
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(newval){
        this.subs.forEach(e=>{
            e.update(newval)
        })
    }
}

//订阅者
class Watcher{
    constructor(data,key,cb){
        Dep.target=this
        // data[key];
        this.cb=cb
    }
    update(e){
        this.cb(e)
        console.log('最后更新了')
    }
}


