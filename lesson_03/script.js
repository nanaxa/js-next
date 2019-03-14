// Внешняя функция для вызова добавления в корзину
function addBasket(id) {
    cart.addToBasket(id);
};

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
    constructor(id, title = 'Товар', price = 'Цена по запросу', img = '../dist/img/no-image.jpg') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item"><div class="goods-info"><img src="${this.img}" alt="${this.title}"><h3>${this.title}</h3><p>${this.price}</p></div><button class='addClick' onclick='addBasket(${this.id})'>Добавить</button></div>`;
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
            const goodItem = new GoodItem(good.id, good.title, good.price, good.img);
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


// Класс элемента корзины
class BasketItem {
    // По сути, нам нужно отображать в корзине те же самые элементы, что и в списке
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    // Однако внешний вид может быть другим (пока не прописывал)
    render() {
        return `<div class="basket-item"><img src="${this.img}" alt="${this.title}"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div></div>`;
    }
}

// Класс корзины
class Basket {
    constructor() {
        // В классе корзины массив с добавленными товарами
        this.cartGoods = [];
        this.deletedGoods = []; // Можно заморочится и добавить товары, которые были удалены из корзины (их можно быстро вернуть в список - убираем боль/проблему поиска, если удалено случайно/пользователь передумал)
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket(id) {
        console.log(id);
        let toBasket;
        list.goods.forEach(function(item) {
            if(id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    img: item.img
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.render();
    }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket() {}

    // Рендер динамического содержимого корзины
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.title, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.basket-list').innerHTML = readHtml;
    }
}

const list = new GoodsList();
const cart = new Basket();
list.fetchGoods('response.json');
