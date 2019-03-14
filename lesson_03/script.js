// Функция, которая при нажатии кнопки делает запрос по ссылке, указанной в аргументе
function loadBut() {
    const element = event.target;
    const src = element.getAttribute('data-load');
    list.fetchGoods(src);
}
// Функция запроса / ответа
function makeGETRequest(url, callback) {
    let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

// Класс товара
class GoodItem {
    constructor(title = 'Товар', price = 'Цена по запросу', img = '../dist/img/no-image.jpg') {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item"><div class="goods-info"><img src="${this.img}" alt="${this.title}"><h3>${this.title}</h3><p>${this.price}</p></div><button class='addClick'>Добавить</button></div>`;
    }
}
// Класс списка товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }
    // Для функции сделал необходимым данный аргумент, чтобы можно было менять его значение извне
    fetchGoods(url) {
        makeGETRequest(url, (good) => {
            this.goods = JSON.parse(good);
            this.render();
            this.calcAllGoods();
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }
}


const list = new GoodsList();
list.fetchGoods('response.json');