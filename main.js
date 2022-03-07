const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');//一层蒙版，用作修饰、添加特效

const pics = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

for (i = 0; i < 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/'+pics[i]);
    thumbBar.appendChild(newImage);
    newImage.onclick = function (x) {
        displayedImage.src = x.target.src;//target用法有点没搞懂，第二天再看看
    }
    
}

btn.onclick = function () {
    const DL=btn.getAttribute('class');
    if (DL === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor='rgba(0,0,0,0.5)';
    } else if (DL === 'light') {
        btn.setAttribute('class', 'dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';

    }
}

