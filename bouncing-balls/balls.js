// 设置画布
const canvas = document.querySelector('canvas');//引用‘画布’元素
const ctx = canvas.getContext('2d');//指代画布上一块允许绘制2D图像的区域

const width = canvas.width = window.innerWidth;//使用变量width引用画布宽，让画布宽和窗口宽一致
const height = canvas.height = window.innerHeight;//使用变量height引用画布高，让画布高和窗口高一致

// 生成随机数的函数
function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}//常用函数，记忆

function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}//小球的随机颜色

function Ball(x, y, velX, velY, color, size) {
    this.x = x;//圆心x坐标
    this.y = y;//圆心y坐标
    this.velX = velX;//水平速度
    this.velY = velY;//垂直速度
    this.color = color;//小球颜色
    this.size = size;//小球半径
}//创建小球对象

Ball.prototype.draw = function () {
    ctx.beginPath();//必须--声明开始画小球
    ctx.fillStyle = this.color;//定义小球颜色
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//绘制2D小球
    ctx.fill();//与beginPath配套使用，开始填充
}//添加原型方法，画小球

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }//若小球的右端即将超出右边界，水平速度方向逆转

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }//若小球的左端即将超出左边界，水平速度方向逆转

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }//若小球的上端即将超出上边界，垂直速度逆转

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }//若小球的下端即将超出下边界，垂直速度逆转

    this.x += this.velX;
    this.y += this.velY;//小球移动参数
}//添加原型方法，用于控制小球速度与判定边界


let balls = [];//数组用于存储随机小球

while (balls.length < 25) {
    let size = random(10, 20);//设置随机半径
    let ball = new Ball(
        // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomColor(),
        size
    );//创建小球对象实例
    balls.push(ball);//未懂
}

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;//两球间的x轴向间距
            const dy = this.y - balls[j].y;//两球间的y轴向间距
            const distance = Math.sqrt(dx * dx + dy * dy);//平方根函数，计算两球的中心距

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }//若中心距小于半径和，改变两球的颜色
        }//边界条件避免小球与自己碰撞检测
    }//遍历小球数组
}//小球的碰撞检测

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';//填充矩形的样式
    ctx.fillRect(0, 0, width, height);//填充充满整个画布的矩形，用于协助变更试图

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();//调用draw函数，开始画小球
        balls[i].update();//调用update函数，赋予小球初始物理参数
        balls[i].collisionDetect();//调用碰撞检测函数
    }//遍历小球数组，为每个小球添加属性和方法

    requestAnimationFrame(loop);/*再运行一次函数 —— 当一个函数正在运行时传递相同的
                                 * 函数名，从而每隔一小段时间都会运行一次这个函数，
                                 * 这样我们可以得到一个平滑的动画效果。这主要是通过递归完成的*/
}

loop();


