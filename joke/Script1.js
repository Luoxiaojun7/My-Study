const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");//引用一些html元素

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}//随机选择数组中的一个元素

let storyText = "今天气温 34 摄氏度，:inserta:出去遛弯。当走到:insertb:门前时，突然就:insertc:。人们都惊呆了，李雷全程目睹但并没有慌，因为:inserta:是一个 130 公斤的胖子，天气又辣么热。";//样本文本，使用：（）：方便定位
let insertX = ["怪兽威利", "大老爹", "圣诞老人"];//插入inserta的值
let insertY = ["肯德基", "迪士尼乐园", "白宫"];//插入insertb的值
let insertZ = ["自燃了", "在人行道化成了一坨泥", "变成一条鼻涕虫爬走了"];//插入insertc的值

randomize.addEventListener("click", result);//为按钮添加点击监听事件

function result() {
    let newStory = storyText;//声明新变量很有必要，这样才能每次点击按钮生成新故事

    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);//随机选择一个数组元素，并赋值给新变量，方便与样本文本做字符替换

    newStory = newStory.replace(":inserta:", xItem);
    newStory = newStory.replace(":insertb:", yItem);
    newStory = newStory.replace(":insertc:", zItem);
    newStory = newStory.replace(":inserta:", xItem);//字符替换

    if (customName.value !== "") {
        let name = customName.value;
        newStory = newStory.replace("李雷", name);
    }//检测是否输入值，有则替换名字

    if (document.getElementById("american").checked) {
        let weight = Math.round(300) + "磅";
        let temperature = Math.round(94) + "华氏度";
        newStory = newStory.replace(" 34 摄氏度", temperature);
        newStory = newStory.replace(" 130 公斤", weight);
    }//提高切换对应的文本

    story.textContent = newStory;//将新生成的文本赋值
    story.style.visibility = "visible";
}