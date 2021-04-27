class Dialog {
    constructor(data) {
        this.opt = {
            title: '天下第一前端',
            content: '东东爱前端',
            success(e) {
                console.log(e)
                console.log('成功了')
             },
            cancel() { 
                console.log('关闭了')
            }
        }
        this.opt = Object.assign(this.opt, data)
        this.init()
    }
    init() {
        this.creatDialog()
        this.addEvent()
    }
    creatDialog() {
        let diaBox = document.createElement('div')
        diaBox.innerHTML = ` <div class="dialog">
        <h4>${this.opt.title}</h4>
        <div>
        ${this.opt.content}
        </div>
        <button class="yes">确定</button>
        <button class="close">关闭</button>
    </div>`
        diaBox.style.display = 'none'
        document.body.appendChild(diaBox);
        this.diaBox=diaBox;
    }
    addEvent() {
        let dialog = document.querySelector(".dialog")
        dialog.addEventListener('click', (e) => {
            let className = e.target.className;
            switch (className) {
                case 'close':
                    this.opt.cancel();
                    this.close();
                    break;
                case 'yes':
                    this.opt.success({detail:'值'});
                    this.close();
                    break
            }
        })
    }
    open(){
        this.diaBox.style.display = 'block'       
    }
    close() {
        this.diaBox.style.display = 'none'    
        //this.diaBox.remove()
    }


}


export default Dialog