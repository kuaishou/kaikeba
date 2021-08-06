// 困兽
// 我年少的梦想是
// 成为翱翔天空的雄鹰
// 成为呼啸山林的猛虎
// 成为雄霸草原的雄狮

// 人到中年的我犹如牢笼中的困兽
// 为家庭奔波而琐事颇多
// 为事业奋斗而无所成就
// 为孩子养育而心力憔悴
// 我是一头狂傲的野兽
// 我是一头愤怒的困兽
// 我终将被生活驯服
// 成为一头沉默耕作的老牛





// 防抖：持续触发事件的时候一定时间内没有再触发事件，事件才会再执行一次

// 节流：持续触发事件的时候，保证一定事件内只触发一次事件（一直点击一个事件，然后每隔一秒执行一次）

// 1、分别用在什么场景下
// 节流：resize、scroll滚动等
// 防抖：input输入请求后端

// 2、来手写一个节流函数

function throttle(fn,interval) {
    let last=0;
    return function(){
        let now=Date.now();
        if(now-last>=interval){
            last=now;
            fn.apply(this,arguments)
        }
    }
}


function ciciks() {
    console.log('节流啦')
}
const cicikshander=throttle(ciciks,1000)

cicikshander()
cicikshander()
cicikshander()
cicikshander()
cicikshander()

 // 2、防抖功能函数，接受传参
 function debounce(fn) {
    // 4、创建一个标记用来存放定时器的返回值
    let timeout = null;
    return function() {
      // 5、每次当用户点击/输入的时候，把前一个定时器清除
      clearTimeout(timeout);
      // 6、然后创建一个新的 setTimeout，
      // 这样就能保证点击按钮后的 interval 间隔内
      // 如果用户还点击了的话，就不会执行 fn 函数
      timeout = setTimeout(() => {
        fn.call(this, arguments);
      }, 1000);
    };
  }

  // 2、节流函数体
  function throttle(fn) {
    // 4、通过闭包保存一个标记
    let canRun = true;
    return function() {
      // 5、在函数开头判断标志是否为 true，不为 true 则中断函数
      if(!canRun) {
        return;
      }
      // 6、将 canRun 设置为 false，防止执行之前再被执行
      canRun = false;
      // 7、定时器
      setTimeout( () => {
        fn.call(this, arguments);
        // 8、执行完事件（比如调用完接口）之后，重新将这个标志设置为 true
        canRun = true;
      }, 1000);
    };
  }