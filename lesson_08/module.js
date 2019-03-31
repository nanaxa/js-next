const calcAllGoods = () => {
    let totalPrice = 0;
    this.basketGoods.forEach((good) => {
        if (good.price !== undefined) {
            totalPrice += good.price;
        }
    });
    this.totalPriceMessage = 'Cумма товаров в корзине: ' + totalPrice;
    this.totalPriceCoin = totalPrice;
};

export default {
    calcAllGoods: calcAllGoods
};