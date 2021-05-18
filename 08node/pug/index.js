//node模板语法学习  pug模板


//安装npm i koa koa-router koa-views pug -S
const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
let app = new Koa()
let router = new Router()
app.use(views(__dirname + '/views'), {
    map: {
        html: 'png'
    }
})
router.get('/', async ctx => {
    //console.log(ctx)
    await ctx.render('index.pug',{
        data:'变量数据'
    })
    // ctx.body='hello'
})
app.use(router.routes())//router.routes()中间件函数只要访问就执行
app.listen(3000)

//nodemon 08node/pug/index.js   启动服务监听3000端口 


let srr =[
    "https://stest.sinosafe.com.cn/micro-doc/japp-upload/cms/res/20210511/0e70af3bc1ff435e86461e6b63e789c7.jpg",
    "https://stest.sinosafe.com.cn/micro-doc/japp-upload/cms/res/20210511/1f09435f1e664b29a26ab60c4d550c8e.jpg",
    "https://stest.sinosafe.com.cn/micro-doc/japp-upload/cms/res/20210511/d6343b8899464916b4c6666c468d583f.jpg",
    "https://stest.sinosafe.com.cn/micro-doc/japp-upload/cms/res/20210511/084740dbe5424fc9ba25f95b87bb23e5.jpg",
    "https://stest.sinosafe.com.cn/micro-doc/japp-upload/cms/res/20210511/eb8b86f3241f4e239ce2da9c51973a7f.jpg"
]

questionList=[{
    "title": "本保障计划是否有等待期？",
    "content": "本保障计划因疾病导致的责任范围内的医疗责任等待期为30天，扁桃腺、甲状腺、疝气、女性生殖系统疾病的检查与治疗等待期为120天。续保或因遭受意外伤害导致的责任范围内的医疗责任无等待期。",
}, {
    "title": "可以赔付哪些医疗费用？",
    "content": "被保险人因遭受意外伤害事故或在等待期后因患疾病在二级及以上的公立医院普通部接受住院、住院前30天（含住院当日）和出院后30天（含出院当日）门急诊（与该次住院相同原因）、特殊门诊和门诊手术治疗的，对于责任内个人支付超过免赔额的部分，按约定的赔付比例给付，不限医保目录范围，合理且必需的进口药自费药均可赔付。<br/>此外，若被保险人在等待期后初次确诊罹患恶性肿瘤，承担责任内的恶性肿瘤相关的院外特定药品费用以及在上海市质子重离子医院接受质子重离子治疗的医疗费用。",
}, {
    "title": "年免赔额1万元，怎么理解? 什么情况下没有免赔额？",
    "content": "保险期间内，属于保险责任范围且由您个人支付的医疗费用，累计超过1万元部分由华安保险赔付。在其他商业保险或其他第三方已赔付部分可用于抵扣免赔额，但基本医保或公费医疗赔付部分不能用于抵扣免赔额。<br/>如被保险人因遭受意外伤害事故或在等待期后初次确诊罹患本合同约定的120种重大疾病在医院接受治疗的，则被保险人自该重大疾病确诊并接受住院治疗之日起发生的保险责任内的医疗费用不再扣除免赔额。 质子重离子医疗责任和恶性肿瘤特定药品费用医疗责任中的免赔额均为0元。",
}, {
    "title": "投保前已经生的病可以赔付么？",
    "content": "不可以，本险种不接受带病投保的行为。首次投保前已患有的疾病以及症状，均不属于保障范围。",
}]
