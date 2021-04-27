// 保证一个类只有一个实例并提供一个访问全局的访问点是单例设计模式
class Person {
    static instance=null;//静态属性
    constructor(name) {
        this.name = name;
        if (!Person.instance) {//保证只能实例化一次
            Person.instance = this
        }
        return Person.instance;
    }
}

export default Person