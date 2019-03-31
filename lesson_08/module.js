import {EventEmitter} from 'events';
export const calcAllGoods = () => {
    let totalPrice = 0;
    this.basketGoods.forEach((good) => {
        if (good.price !== undefined) {
            totalPrice += good.price;
        }
    });
    this.totalPriceMessage = 'Cумма товаров в корзине: ' + totalPrice;
    this.totalPriceCoin = totalPrice;
};

export const test = (text) => `hello, ${text}`;

export const bus = new EventEmitter();