// Внешняя функция для вызова добавления в корзину
function addBasket(id) {
    cart.addToBasket(id);
};
// Внешняя функция для вызова удаления из корзины
function deleteItem(id) {
    cart.deleteFromBasket(id);
};
// Внешняя функция для вызова рендера корзины
function viewCart() {
    cart.render();
};

// Функция, которая при нажатии кнопки делает запрос по ссылке, указанной в аргументе
function loadBut() {
    const element = event.target;
    const src = element.getAttribute('data-load');
    list.fetchGoods(src);
}
// Функция запроса / ответа на промисах
function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        // console.log('Работает промис');
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      });
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
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="basket-item"><img src="${this.img}" alt="${this.title}"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div><button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
    }
}

// Класс корзины
class Basket {
    constructor() {
        this.cartGoods = [];
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket(id) {
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
        this.basketCount();
    }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.forEach(function(item, i) {
            let thisId = item.id;
            if(id == thisId) {
                getIdElemen = i;
            }
            
        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }

    // Считаем стоимость товаров в корзине
    calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }

    // Считаем количество товаров в корзине и выводим на кнопку
    basketCount() {
        let count = this.cartGoods.length;
        document.getElementById('cartcoint').innerHTML = ' (' + count + ')';
    }

    // Рендер динамического содержимого корзины
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id, good.title, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = readHtml;
        this.calcAllGoods();
    }
}

const list = new GoodsList();
const cart = new Basket();
list.fetchGoods('response.json');