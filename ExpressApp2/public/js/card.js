'use strict';
//модуль карзины
var cart=(function ($) {
    var cartData,
        opts={};

    function test() {
        alert("ddsfdsfdsf");
    }

    function init() {
        _initOptions();
        updateData();
        if (opts.renderCartOnInit) {
            renderTotalCartSumma();
            renderMenuCart();
        }
        /*if (opts.renderMenuCartOnInit) {
            renderMenuCart();
        }*/
        _bindHandlers();
    }

    function _initOptions() {
        opts={
            renderCartOnInit: true,                     // рендерить ли корзину при инициализации
            renderMenuCartOnInit: true,                 // рендерить ли количество товаров в меню при инициализации
            elAddToCart: '.add-to-cart',             // селектор для кнопки добавления в корзину
            attrId: 'data-id',                          // дата-атрибут для id товара
            attrName: 'data-name',                      // дата-атрибут для названия товара
            attrPrice: 'data-price',                    // дата-атрибут для цены товара
            attrDelta: 'data-delta',                    // дата-атрибут, показывающий, на сколько нужно изменить количество товара в корзине (-1 и 1)
            elCart: '#cart',                            // селектор для содержимого корзины
            elTotalCartCount: '.total-cart-count',      // селектор для количества товаров в корзине
            elTotalCartSumma: '#total-cart-summa',      // селектор для общей суммы заказа
            elCartItem: '.js-cart-item',                // селектор для отдельного пункта корзины
            elCartCount: '.js-count',                   // селектор для количества отдельного товара
            elCartSumma: '.js-summa',                   // селектор для суммы отдельного товара
            elChangeCount: '.js-change-count',          // селектор для кнопок изменения количества
            elRemoveFromCart: '.js-remove-from-cart',   // селектор для кнопки удаления из корзины
            elOrder: '#order'                           // селектор для кнопки оформления заказа
        }
    }

    function _bindHandlers() {

        _onClickAddBtn();
    }

    // Добавление в корзину
    function _onClickAddBtn() {
        $('body').on('click', opts.elAddToCart, function(e) {
            e.preventDefault();
            var $this = $(this);
            add({
                id: $this.attr(opts.attrId),
                name: $this.attr(opts.attrName),
                price: $this.attr(opts.attrPrice),
                count: 1
            });
            renderMenuCart();
            renderTotalCartSumma();
            alert('Товар добавлен в корзину');
        });
    }

    // Получаем данные
    function updateData() {
        cartData = JSON.parse(localStorage.getItem('cart')) || [];
        return cartData;
    }

// Возвращаем данные
    function getData() {
        return cartData;
    }

// Сохраняем данные в localStorage
    function saveData() {
        localStorage.setItem('cart', JSON.stringify(cartData));
        return cartData;
    }

// Очищаем данные
    function clearData() {
        cartData = [];
        saveData();
        return cartData;
    }

// Поиск объекта в коллекции cartData по id
    function getById(id) {

        for(var i in cartData)
        {
            //alert(cartData[i].id);
            if(cartData[i].id==id)
            {
                //alert(cartData[i].id);
                return cartData[i];

            }
        }
    }

    // Рендерим количество товаров в меню
    function renderMenuCart() {
        var countAll = getCountAll();
        $(opts.elTotalCartCount).html(countAll !== 0 ? countAll : 0);
    }

    // Рендерим общую сумму товаров
    function renderTotalCartSumma() {
        $(opts.elTotalCartSumma).html(getSumma()+" руб");
    }

// Добавление товара в коллекцию
    function add(item) {
        var oldItem;
        updateData();
        oldItem = getById(item.id);
        if(!oldItem) {
            cartData.push(item);
        } else {
            oldItem.count = oldItem.count + item.count;
        }
        saveData();
        return item;
    }

// Удаление товара из коллекции
    function remove(id) {
        updateData();
        /*cartData = _.reject(cartData, function(item) {
            return item.id === id;
        });*/
        cartData.slice(cartData.indexOf(getById(id)),1);
        saveData();
        return cartData;
    }

// Изменение количества товара в коллекции
    function changeCount(id, delta) {
        var item;
        updateData();
        item = getById(id);
        if(item) {
            item.count = item.count + delta;
            if (item.count < 1) {
                remove(id);
            }
            saveData();
        }
        return getById(id) || {};
    }

// Возвращаем количество товаров (количество видов товаров в корзине)
    function getCount() {
        //return _.size(cartData);
        return cartData.length;
    }

// Возвращаем общее количество товаров
    function getCountAll() {
        var count=0;
        for(var i in cartData)
        {
            count+=cartData[i].count;
        }
        return count;
        //return _.reduce(cartData, function(sum, item) {return sum + item.count}, 0);
    }

// Возвращаем общую сумму
    function getSumma() {
        var sum=0;
        for(var i in cartData)
        {
            sum+=cartData[i].count*cartData[i].price;
        }
        return sum;
        //return _.reduce(cartData, function(sum, item) {return sum + item.count * item.price}, 0);
    }

    return{
        init:init,
        updateData: updateData,
        getData: getData,
        saveData: saveData,
        clearData:clearData,
        getById:getById,
        add:add,
        remove:remove,
        changeCount: changeCount,
        getCount: getCount,
        getCountAll:getCountAll,
        getSumma:getSumma,
        test:test
    }
})(jQuery);

jQuery(document).ready(cart.init);