
// ���û���
const canvas = document.querySelector('canvas');//���á�������Ԫ��
const ctx = canvas.getContext('2d');//ָ��������һ���������2Dͼ�������

const width = canvas.width = window.innerWidth;//ʹ�ñ���width���û������û�����ʹ��ڿ�һ��
const height = canvas.height = window.innerHeight;//ʹ�ñ���height���û����ߣ��û����ߺʹ��ڸ�һ��

const score = document.querySelector('p');
let count = 0;  

// ����������ĺ���
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}//���ú���������

function randomColor() {
    return 'rgb(' +
        random(0, 255) + ', ' +
        random(0, 255) + ', ' +
        random(0, 255) + ')';
}//С��������ɫ

function Shape(x, y, velX, velY,exists) {
    this.x = x;//Բ��x����
    this.y = y;//Բ��y����
    this.velX = velX;//ˮƽ�ٶ�
    this.velY = velY;//��ֱ�ٶ�
    this.exists = exists;//�����ͣ����С��������
}//����С�����

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;

}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;//��һ������





Ball.prototype.draw = function () {
    ctx.beginPath();//����--������ʼ��С��
    ctx.fillStyle = this.color;//����С����ɫ
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//����2DС��
    ctx.fill();//��beginPath����ʹ�ã���ʼ���
}//���ԭ�ͷ�������С��

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }//��С����Ҷ˼��������ұ߽磬ˮƽ�ٶȷ�����ת

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }//��С�����˼���������߽磬ˮƽ�ٶȷ�����ת

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }//��С����϶˼��������ϱ߽磬��ֱ�ٶ���ת

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }//��С����¶˼��������±߽磬��ֱ�ٶ���ת

    this.x += this.velX;
    this.y += this.velY;//С���ƶ�����
}//���ԭ�ͷ��������ڿ���С���ٶ����ж��߽�

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (this !== balls[j]) {
            const dx = this.x - balls[j].x;//������x������
            const dy = this.y - balls[j].y;//������y������
            const distance = Math.sqrt(dx * dx + dy * dy);//ƽ����������������������ľ�

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = randomColor();
            }//�����ľ�С�ڰ뾶�ͣ��ı��������ɫ
        }//�߽���������С�����Լ���ײ���
    }//����С������
}//С�����ײ���



function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'red';
    this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function () {
    ctx.beginPath();//����--������ʼ��С��
    ctx.strokeStyle = this.color;//����С����ɫ
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//����2DС��
    ctx.stroke();//��beginPath����ʹ�ã���ʼ���
}//���ԭ�ͷ���������ħС��

EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
        this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
        this.y += this.size;
    }

}

EvilCircle.prototype.setControls = function () {
    window.onkeydown = e => {
        switch (e.key) {
            case 'a':
                this.x -= this.velX;
                break;
            case 'd':
                this.x += this.velX;
                break;
            case 'w':
                this.y -= this.velY;
                break;
            case 's':
                this.y += this.velY;
                break;
        }
    };
}

EvilCircle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;//������x������
            const dy = this.y - balls[j].y;//������y������
            const distance = Math.sqrt(dx * dx + dy * dy);//ƽ����������������������ľ�

            if (distance < this.size + balls[j].size) {
                balls[j].exists = false;
                count--;
                score.textContent = 'ʣ�� ' + count ;
            }
        }//�߽���������С�����Լ���ײ���
    }
}

let balls = [];//�������ڴ洢���С��

while (balls.length < 25) {
    let size = random(10, 20);//��������뾶
    let ball = new Ball(
        // Ϊ������ƴ����������뻭����Ե����һ����ȵľ���
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        randomColor(),
        size
    );//����С�����ʵ��
    balls.push(ball);//��������
    count++;
    score.textContent = 'ʣ�� '+count ;
}

let evilcircle = new EvilCircle(
    random(0, width),
    random(0, height),
    true
)
evilcircle.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';//�����ε���ʽ
    ctx.fillRect(0, 0, width, height);//���������������ľ��Σ�����Э�������ͼ
    
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();//����draw��������ʼ��С��
            balls[i].update();//����update����������С���ʼ�������
            balls[i].collisionDetect();//������ײ��⺯��
        }
        
    }//����С�����飬Ϊÿ��С��������Ժͷ���
    evilcircle.draw();
    evilcircle.checkBounds();
    evilcircle.collisionDetect();
    requestAnimationFrame(loop);/*������һ�κ��� ���� ��һ��������������ʱ������ͬ��
                                 * ���������Ӷ�ÿ��һС��ʱ�䶼������һ�����������
                                 * �������ǿ��Եõ�һ��ƽ���Ķ���Ч��������Ҫ��ͨ���ݹ���ɵ�*/
}

loop();


