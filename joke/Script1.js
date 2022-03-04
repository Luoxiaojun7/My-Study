const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");//����һЩhtmlԪ��

function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}//���ѡ�������е�һ��Ԫ��

let storyText = "�������� 34 ���϶ȣ�:inserta:��ȥ���䡣���ߵ�:insertb:��ǰʱ��ͻȻ��:insertc:�����Ƕ������ˣ�����ȫ��Ŀ�õ���û�лţ���Ϊ:inserta:��һ�� 130 ��������ӣ���������ô�ȡ�";//�����ı���ʹ�ã����������㶨λ
let insertX = ["��������", "���ϵ�", "ʥ������"];//����inserta��ֵ
let insertY = ["�ϵ»�", "��ʿ����԰", "�׹�"];//����insertb��ֵ
let insertZ = ["��ȼ��", "�����е�������һ����", "���һ�������������"];//����insertc��ֵ

randomize.addEventListener("click", result);//Ϊ��ť��ӵ�������¼�

function result() {
    let newStory = storyText;//�����±������б�Ҫ����������ÿ�ε����ť�����¹���

    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);//���ѡ��һ������Ԫ�أ�����ֵ���±����������������ı����ַ��滻

    newStory = newStory.replace(":inserta:", xItem);
    newStory = newStory.replace(":insertb:", yItem);
    newStory = newStory.replace(":insertc:", zItem);
    newStory = newStory.replace(":inserta:", xItem);//�ַ��滻

    if (customName.value !== "") {
        let name = customName.value;
        newStory = newStory.replace("����", name);
    }//����Ƿ�����ֵ�������滻����

    if (document.getElementById("american").checked) {
        let weight = Math.round(300) + "��";
        let temperature = Math.round(94) + "���϶�";
        newStory = newStory.replace(" 34 ���϶�", temperature);
        newStory = newStory.replace(" 130 ����", weight);
    }//����л���Ӧ���ı�

    story.textContent = newStory;//�������ɵ��ı���ֵ
    story.style.visibility = "visible";
}