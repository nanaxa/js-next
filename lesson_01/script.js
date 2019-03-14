const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title, price) => 
    `<div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>`;

const renderGoodsList = list => {
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
    // Если в метод join в качестве необязательного параметра разделителя мы указываем любой символ (либо не указываем вообще), то между элементами будет выводится символ/запятая (по умолчанию). В данном случае сепаратор указан пустым, ничего не выводится.
}

window.onload = () => {
    renderGoodsList(goods);
};
// Честно, без понятия, чего здесь можно сократить. Как вариант, можно создать сжатый js, но пока не знаю, как можно создавать сжатые файлы автоматически (наподобие sass-компиляции). Рядом с основным есть сжатый js, но сделан с помощью онлайн-инструмента.