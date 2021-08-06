//重写vue1.0

function observe(obj) {
    if (typeof obj !== 'object' || obj == null) { return }
    new Observe(obj)
}

function defineReactive(obj, key, val) {
    observe(val)

    //每次执行一次该函数就会创建一个Dep管家
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', val)
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                console.log('set', newVal)
                observe(newVal)
                val = newVal
                dep.notify()
            }
        }
    })
}
function proxy(vm) {//代理--将$data的key代理到myVue上--vue实例中获取数据不再要使用app.$data.count++直接app.count++
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                vm.$data[key] = newVal
            }
        })
    })
}

class myVue {
    constructor(options) {
        //保存选项
        this.$options = options;
        this.$data = options.data;

        //响应化处理数据
        observe(this.$data)

        //代理--将$data的key代理到myVue上--vue实例中获取数据不再要使用app.$data.count++直接app.count++
        proxy(this)

        //编译
        new Compile('#app', this)
        // this.compile()
    }
}
//每一个响应式对象，生成一个observe实例
class Observe {
    constructor(value) {
        this.value = value
        //判断value是obj还是数组
        this.walk(value)
    }
    walk(obj) {
        Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]))
    }
}

/*编译过程*/
class Compile {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        //编译模板
        if (this.$el) {
            this.compile(this.$el)
        }
    }
    compile(el) {
        //递归遍历el；判断其类型
        el.childNodes.forEach(node => {
            if (this.isElement(node)) {
                console.log('编译元素', node, node.nodeName)
                this.compileElement(node)
            } else if (this.isInter(node)) {
                //console.log('编译插值表达式',node.textContent)
                this.compileText(node)
            }

            if (node.childNodes) {
                this.compile(node)
            }
        })

    }
    compileText(node) {
        //获取匹配的表达式的值
        //RegExp.$1是在isInter中\{\{(.*)\}\}/.test(node.textContent)获取到的
        // node.textContent = this.$vm[RegExp.$1]
        this.update(node, RegExp.$1, 'text')
    }
    compileElement(node) {
        const nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach(attr => {
            const attrName = attr.name
            const exp = attr.value

            if (this.isDirective(attrName)) {
                const dir = attrName.substring(2)
                this[dir] && this[dir](node, exp)
            }
            //事件处理
            if (this.isEvent(attrName)) {
                const dir = attrName.substring(1)
                //事件监听
                this[dir] && this[dir](node, exp)
                this.eventHandler(node, exp, dir)
            }
        })

    }
    eventHandler(node, exp, dir) {
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
        node.addEventListener(dir, fn.bind(this.$vm))
    }
    //文本指令k-text   this[dir]的值的该text()方法
    text(node, exp) {
        this.update(node, exp, 'text')
    }
    //文本指令k-html   this[dir]的值的该text()方法
    html(node, exp) {
        this.update(node, exp, 'html')
    }
    model(node, exp) {
        this.update(node, exp, 'model')
    }
    textUpdater(node, val) {//添加指令方法供const fn = this[dir + 'Updater']调用
        node.textContent = val
    }
    htmlUpdater(node, val) {//添加指令方法供const fn = this[dir + 'Updater']调用
        node.innerHTML = val
    }
    modelUpdater(node, val) {//添加指令方法供const fn = this[dir + 'Updater']调用
        node.value = val
    }

    //所有动态绑定都需要创建更新函数以及对应的watcher实例
    update(node, exp, dir) {
        //初始化
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        //更新
        new Watcher(this.$vm, exp, function (val) {
            fn && fn(node, val)
        })

    }

    isEvent(attrname) {
        return attrname.indexOf('@') === 0
    }
    isDirective(attrname) {//判断是否是指令表达式
        return attrname.indexOf('k-') === 0
    }
    //元素
    isElement(node) {//判断节点是否是元素
        return node.nodeType === 1
    }
    isInter(node) {//判断节点是否是插值表达式
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }
}

//watcher：小秘书，监控界面中一个依赖对应一个小秘书
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn
        //依赖收集--读取数据触发defineReactive（）里面的get方法
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    //管家
    update() {
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

class Dep {
    constructor() {
        this.deps = []
    }
    addDep(watcher) {//watcher数组
        this.deps.push(watcher)
    }
    notify() {//通知更新方法
        this.deps.forEach(watcher => {
            watcher.update()
        })
    }
}