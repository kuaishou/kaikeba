//方法一；使用自定义事件===监听事件方式实现数据绑定


class MyVue extends EventTarget{
    constructor(options){
        super()
        this.$options=options;
        this.$data=options.data;
        this.observe(this.$data)
        this.compile()
    }
    observe(data){//使用difinepeoperty实现数据对象监听----观察数据，劫持数据
        Object.keys(data).forEach(key=>{
            let value=data[key]//先保存起来防止下面defineProperty的调用进入死循环
            let _this=this
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    console.log('get数据',value)
                    return value
                },
                set(newVal){
                    console.log('set数据',value)
                    let event=new CustomEvent(key,{detail:newVal})//222添加事件触发事件
                    _this.dispatchEvent(event)//触发事件更新改变页面数据
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
                    console.log(this.$data[$1])
                    node.textContent=node.textContent.replace(reg,this.$data[$1])

                    //222编译 添加自定义事件
                    this.addEventListener($1,e=>{
                        let neeVal=e.detail
                        let oldVal=this.$data[$1]
                        let reg=new RegExp(oldVal)
                        node.textContent=node.textContent.replace(reg,neeVal)
                    })
                }
            }else if(node.nodeType===1){
                if(node.childNodes.length>0){
                    this.compileChildnodes(node)
                }
            }
        });
    }
}