class GoodItem {
    constructor(title = 'Товар', price = 'Цена по запросу', img = 'img/no-image.jpg') {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="goods-item">
                <div class="goods-info">
                  <img src="${this.img}" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                </div>
                <button class='addClick'>Добавить</button>
              </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [{
                title: 'Shirt',
                price: 150,
                img: "images/shirt.jpg"
            },
            {
                title: 'Socks',
                price: 50,
                img: 'images/socks.jpg'
            },
            {
                title: 'Jacket',
                price: 350,
                img: 'images/jacket.jpg'
            },
            {
                title: 'Shoes',
                price: 250,
                img: 'images/shoes.jpg'
            },
            {
                price: 250,
                img: 'images/shoes.jpg'
            },
            {
                title: 'Watch',
                img: 'images/watches.jpg'
            },
            {
                title: 'Shoes',
                price: 250,
            },
            {}
        ]
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
            if(good.price !== undefined) {
                totalPrice += good.price;
                console.log(good.price);
            }
        });
        let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }
}

// Класс элемента корзины
class BasketItem {
    // По сути, нам нужно отображать в корзине те же самые элементы, что и в списке
    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link; // Вероятно, ссылка на страницу товара
    }
    // Однако внешний вид может быть другим (пока не прописывал)
    render() {

    }
}
// Класс корзины
class Basket {
    constructor() {
        // В классе корзины массив с добавленными товарами
        this.addGoods = [];
        this.deletedGoods = []; // Можно заморочится и добавить товары, которые были удалены из корзины (их можно быстро вернуть в список - убираем боль/проблему поиска, если удалено случайно/пользователь передумал)
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket() {}

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket() {}

    // Считаем стоимость и количество товаров в корзине
    calcBasket() {}

    // Метод, который определяет, добавлены ли в корзину какие-либо товары и при их наличии активирует кнопку "Оформить заказ"
    isOrder() {}

    // Рендер динамического содержимого корзины
    render() {}

    // Метод открывания корзины
    openBasket() {}
}

const list = new GoodsList();
list.fetchGoods();

window.onload = () => {
    list.render();
    list.calcAllGoods();
};