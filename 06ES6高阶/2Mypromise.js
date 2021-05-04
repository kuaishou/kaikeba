class Mypromise {
    constructor(handle) {
        this.status = 'pedding';//状态
        this.value = undefined;//结果
        this.resolveFn = [];
        this.rejectFn = [];
        handle(this._resolve.bind(this), this._reject.bind(this))
    }
    _resolve(val) {
        this.status = 'fulfilled';
        this.value = val;
        const run = () => {
            let cb;
            while (cb = this.resolveFn.shift()) {
                cb && cb(val)
            }
        }
        setTimeout(run);
    }
    _reject(val) {
        this.status = 'rejected';
        this.value = val;
        const run = () => {
            let cb;
            while (cb = this.rejectFn.shift()) {
                cb && cb(val)
            }
        }
        setTimeout(run);
    }
    then(onResolve, onReject) {

        return new Mypromise((resolve, reject) => {

            this.resolveFn.push(val => {
                let res = onResolve && onResolve(val)
                if (res instanceof Mypromise) {//如果是promise返回promise
                    return res.then(res => {
                        resolve(res)
                    })
                }
                resolve(res)
            })
            this.rejectFn.push(val => {
                let res =onReject && onReject(val)
                reject(res)
            })
        })
    }
    catch(onrejeted) {//catch方法
        this.then(undefined, onrejeted)
    }
    static resolve(val) {//promise.resolve()
        return new Mypromise(resolve => {
            resolve(val)
        })
    }
    static reject(val) {//promise.reject()
        return new Mypromise((resolve, reject) => {
            reject(val)
        })
    }
    static all(lists) {//promise.all()所有执行完成之后返回数组
        let arr=[]
        return new Mypromise((resolve, reject) => {
            lists.forEach(item => {
                item.then(res=>{
                    arr.push(res)
                    if(arr.length===lists.length){
                        resolve(arr)
                    }
                })
            });
        })
    }
    static arace(lists) {//promise.race()有一个执行完就返回
        return new Mypromise((resolve, reject) => {
            lists.forEach(item => {
                item.then(res=>{
                    resolve(res)
                },err=>{
                    reject(err)
                })
            });
        })
    }
    finally(cb) {//promise.finally()最后默认执行
        return this.then(res=>{
            cb()
        },err=>{
            cb()
        })
    }
}