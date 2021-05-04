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
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    console.log('get数据',value)
                    return value
                },
                set(newVal){
                    console.log('set数据',value)
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
                }
            }else if(node.nodeType===1){
                if(node.childNodes.length>0){
                    this.compileChildnodes(node)
                }
            }
        });
    }
}