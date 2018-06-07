'use strict';
//модуль карзины
var cart=(function ($) {
    var cartData,
        opts={};

    function init() {
        _initOptions();
        updateData();
        if ($(opts.renderCartOnInit).length) {
            renderTotalCartSumma();
            renderMenuCart();
            if ($(opts.renderCartViewOnInit).length)
            {
                renderCartView();
            }
        }
        else
            opts.workWithLocalStorage=false;
        _bindHandlers();
    }

    function _initOptions() {
        opts={
            //renderCartOnInit: true,                     // рендерить ли корзину при инициализации
            workWithLocalStorage: true,                 // работать ли с localStorage
            renderCartOnInit: '.buildByJqueryScore',    // рендерить ли корзину при инициализации
            renderCartViewOnInit: '.buildByJqueryView', // рендерить представление корзины
            elAddToCart: '.add-to-cart',                // селектор для кнопки добавления в корзину
            elDeleteFromCart: '.delete-from-cart',      // селектор для кнопки удадения из карзины
            elChangeQuantityGoods: '.change-quantity-goods',      // селектор для input text при изменении текста
            attrId: 'data-id',                          // дата-атрибут для id товара
            attrName: 'data-name',                      // дата-атрибут для названия товара
            attrPrice: 'data-price',                    // дата-атрибут для цены товара
            attrDelta: 'data-delta',                    // дата-атрибут, показывающий, на сколько нужно изменить количество товара в корзине (-1 и 1)
            elCart: '#cart',                            // селектор для содержимого корзины
            elTotalCartCount: '.total-cart-count',      // селектор для количества товаров в корзине
            elTotalCartSumma: '.total-cart-summa',      // селектор для общей суммы заказа
            elCartItem: '.js-cart-item',                // селектор для отдельного пункта корзины
            elCartCount: '.js-count',                   // селектор для количества отдельного товара
            elCartSumma: '.js-summa',                   // селектор для суммы отдельного товара
            elChangeCount: '.js-change-count',          // селектор для кнопок изменения количества
            elRemoveFromCart: '.js-remove-from-cart',   // селектор для кнопки удаления из корзины
            elOrder: '#order'                           // селектор для кнопки оформления заказа
        }
    }

    function _bindHandlers() {
        if (opts.workWithLocalStorage){
            _onClickAddBtnLS();
            _onDeleteOrderLS();
            _onChangeQuantityLS();
        }
        else{
            _onClickAddBtnDB();
            _onDeleteOrderDB();
            _onChangeQuantityDB();
        }
    }

    function renderTime(data)
    {
        if(data%100<10)
            return "0"+data;
        return data;
    }

// ***************************************************Work*with*database*******************************************
    // биндинг события "Добавление в карзину с БД"
    function _onClickAddBtnDB(){
        $('body').on('click', opts.elAddToCart, function(e) {
            e.preventDefault();
            var $this = $(this);
            var idnType=$this.attr(opts.attrId).split('_');
            if (idnType[1]=="0")
                idnType[1]="1";
            else
                idnType[1]="2";
            var curDate=new Date();
            var curDateStr=curDate.getFullYear()+"-"+(renderTime(curDate.getMonth()+1))+"-"+renderTime(curDate.getDate())+" "+renderTime(curDate.getHours())+":"+renderTime(curDate.getMinutes())+":"+renderTime(curDate.getSeconds());
            $.post('/api/addOrder', {"id_album": idnType[0], "disc_type": idnType[1], "date_time": curDateStr},
                function(data){
                    data=JSON.parse(data);
                    console.log(data);
                    renderCartDataDB(data.countGoods, data.sum);

                    alert('Товар добавлен в корзину БД');
                });
        });
    }

    // биндинг события "Изменение количества товара с БД" 
    function _onChangeQuantityDB()
    {
        $('body').on('change', opts.elChangeQuantityGoods, function(e) {
            e.preventDefault();
            var $this = $(this);
            var value=$this.val();
            if (value.length==0||/\D/.test(value))
                {
                    value="1";
                    $(this).val(value);
                }
            if (value[0]=='0')
            {
                value="1";
                $(this).val(value);
            }

            $.post('/api/updateOrder', {"id_order": $this.attr(opts.attrId), "quantity_or": Number(value)},
                function(data){
                    data=JSON.parse(data);
                    console.log(data);

                    renderCurrentSumCartDB($this.attr(opts.attrId), (Number(value)*$this.attr(opts.attrPrice)));
                    renderCartDataDB(data.countGoods, data.sum);
                }); 
        });
    }

    // биндинг события "Удаление заказа с БД"
    function _onDeleteOrderDB()
    {
        $('body').on('click', opts.elDeleteFromCart, function(e) {
            e.preventDefault();
            var $this = $(this);

            $.post('/api/deleteOrder', {"id_order": $this.attr(opts.attrId)},
                function(data){
                    data=JSON.parse(data);
                    console.log(data);
                    renderCartDataDB(data.countGoods, data.sum);

                    $('tr[class='+$this.attr(opts.attrId)+']').remove();
                    alert('Товар удалён из корзины');
                });            
        });
    }

    // рендеринг количества и суммы товаров
    function renderCartDataDB(countGoods, sumPrice)
    {
        $(opts.elTotalCartCount).html(countGoods);
        $(opts.elTotalCartSumma).html(sumPrice+" руб");
    }

    // Рендерим сумму определённого товара
    function renderCurrentSumCartDB(id, sum) {
        $(opts.elCartSumma, "."+id).html(sum+" р");
    }

// ***************************************************Work*with*localStorage***************************************
    // Добавление в корзину
    function _onClickAddBtnLS() {
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

    // Изменение количества товара
    function _onChangeQuantityLS()
    {
        $('body').on('change', opts.elChangeQuantityGoods, function(e) {
            e.preventDefault();
            var $this = $(this);
            var value=$this.val();
            if (value.length==0||/\D/.test(value))
                {
                    value="1";
                    $(this).val(value);
                }
            if (value[0]=='0')
            {
                value="1";
                $(this).val(value);
            }

            changeCount($this.attr(opts.attrId), Number(value));
            //console.log(cartData);

            saveData();

            renderCurrentSumCart($this.attr(opts.attrId));
            renderMenuCart();
            renderTotalCartSumma();
            //alert('Товар изменён');
        });
    }

    // Удаление заказа
    function _onDeleteOrderLS()
    {
        $('body').on('click', opts.elDeleteFromCart, function(e) {
            e.preventDefault();
            var $this = $(this);

            remove($this.attr(opts.attrId));
            $('tr[class='+$this.attr(opts.attrId)+']').remove();

            renderMenuCart();
            renderTotalCartSumma();
            alert('Товар удалён из корзины');
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

    // Рендерим сумму определённого товара
    function renderCurrentSumCart(id) {
        var item=getById(id);
        $(opts.elCartSumma, "."+id).html((item.price*item.count)+" р");
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

// Рендер представления корзины
    function renderCartView(){
        updateData();
        var countAll = getCountAll();
        $(".path").after(
        '<div class="container d-flex">'+
          '<div class="p-1 b-tittle-3">Оформить заказ</div>'+
          '<div class="ml-auto p-1 b-tittle-4"><span class="total-cart-count">'+countAll+'</span> товар</div>'+
        '</div>'
            );
        if (countAll === 0){
            $(".container.d-flex").after('<div class="text-center my-2 cart-empty">Корзина пуста</div>');
        }
        else{
            $(".container.d-flex").after(
                '<div class="container">'+
                  '<form>'+
                    '<div class="form-row">'+
                      '<div class="col-md-6 p-0 mb-2">'+
                        '<div class="form-order p-3 rounded">'+
                          '<div class="b-form-tit">'+
                            'Получатель'+
                          '</div>'+
                          '<div class="p-2">'+
                            '<div class="form-group">'+
                              '<input type="text" class="form-control" name="surname" placeholder="Фамилия">'+
                            '</div>'+
                            '<div class="form-group">'+
                              '<input type="text" class="form-control" name="name" placeholder="Имя">'+
                            '</div>'+
                            '<div class="form-group">'+
                              '<input type="text" class="form-control" name="patronymic" placeholder="Отчество">'+
                            '</div>'+
                            '<div class="form-group">'+
                              '<input type="text" class="form-control" name="phone" placeholder="Телефон: +7 ХХХ-ХХХ-ХХ-ХХ" value size="60" maxlength="128">'+
                            '</div>'+
                            '<div class="form-group">'+
                              '<input type="email" class="form-control" name="email" placeholder="E-mail">'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="col-md-6 p-0 mb-2">'+
                        '<div class="form-order p-3 rounded h-100">'+
                          '<div class="b-form-tit">'+
                            'Доставка'+
                          '</div>'+
                          '<div class="p-2">'+
                            '<div class="form-group">'+
                              '<input type="text" class="form-control" name="city" placeholder="Город">'+
                            '</div>'+
                            '<div class="form-check">'+
                              '<input class="form-check-input" type="radio" name="deliverBy" id="IdByPostamat" value="postamat">'+
                              '<label class="form-check-label" for="IdByPostamat">'+
                                'Через пункт выдачи или в постамат'+
                              '</label>'+
                            '</div>'+
                            '<div class="form-check">'+
                              '<input class="form-check-input" type="radio" name="deliverBy" id="IdByPost" value="post">'+
                              '<label class="form-check-label" for="IdByPost">'+
                                'Почта России (в отделение связи)'+
                              '</label>'+               
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</form>'+
                  '<div class="b-tittle-3 text-center mb-2">'+
                    '<span class="mr-4">Итого:</span> <span class="total-cart-count">'+countAll+'</span> товар на сумму <span class="total-cart-summa" style="color: #f7941e;">'+getSumma()+' руб</span>'+
                  '</div>'+
                  '<table class="table">'+
                    '<thead>'+
                      '<tr>'+
                        '<th scope="col" style="color: #f7941e;">Детали Вашего заказа:</th>'+
                        '<th scope="col">Цена</th>'+
                        '<th scope="col">Формат</th>'+
                        '<th scope="col">Кол-во</th>'+
                        '<th scope="col">Сумма</th>'+
                      '</tr>'+
                    '</thead>'+
                    '<tbody class="basketGoods">'+
                    '</tbody>'+
                  '</table>'+
//hjgh
                  '<div class="mt-2 mb-2 text-center">'+
                    '<button type="button" class="btn btn-success btn-lg">Оформить заказ</button>'+
                  '</div>'+
                '</div>'
                );
        var IdsNTypes=new Array(2);
        for(var i = 0; i < IdsNTypes.length; i++)
            IdsNTypes[i] = new Array(cartData.length);

            for(var i in cartData)
        {
            var idnType=cartData[i].id.split('_');
            IdsNTypes[0][i]=idnType[0];
            IdsNTypes[1][i]=idnType[1];
        }
        //console.log(IdsNTypes[0]);

        getAlbumsByIds(IdsNTypes);
        /*for(var i in cartData)
        {
            var idnType=cartData[i].id.split('_');
            getAlbumById(cartData[i], idnType);
        }*/
        }
    }

// Получить данные о товаре(по 1 товару)
    function getAlbumById(order, idnType)
    {
        $.post('/api/getAlbumById', {'id': idnType[0]},
        function(data) {
            console.log("Ajax passed!");
            var typeName;
            if(idnType[1]=="0")
                {
                    typeName="CD"
                }
                else{
                    typeName="Винил";
                }

            data=JSON.parse(data);
            console.log(data);
            $("tbody[class='basketGoods']").append(
              '<tr>'+
                '<th scope="row">'+
                  '<div class="float-left align-items-center">'+       
                    '<img src="albums-img/'+data.ID_author+'/'+data.ID_album+'/'+data.album_cover.split('.').join('_s.')+'" alt="" class="mr-2 mt-1 d-inline float-left">'+
                    '<div class="d-inline float-left align-middle">'+
                      '<div class="table-text">'+
                       data.alb_name+
                      '</div>'+
                      '<div class="table-text">'+
                       data.author_name+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</th>'+
                '<td class="align-middle">'+order.price+' р</td>'+
                '<td class="align-middle">'+
                  '<div class="tab-table">'+
                    typeName+
                  '</div>'+
                '</td>'+
                '<td class="align-middle">'+
                  '<div>'+
                    '<input class="form-control-sm" value='+order.count+' type="text" size="1" style="background-color: inherit;">'+
                    '<button class="btn-sm btn-danger"><span class="oi oi-trash"></span></button>'+
                  '</div>'+
                '</td>'+
                '<td class="align-middle">'+(order.price*order.count)+' р</td>'+
              '</tr>'
                );
        });
        
    }

// Получить данные о товаре(все сразу)
    function getAlbumsByIds(idnType)
    {
        $.post('/api/getAlbumsByIds', {"id": JSON.stringify(idnType[0])},
        function(data) {
            console.log("Ajax passed!");

            data=JSON.parse(data);
            //console.log(data);

            for(var i in data)
            {
                var typeName;
                if(idnType[1][i]=="0")
                    {
                        typeName="CD"
                    }
                    else{
                        typeName="Винил";
                    }
                $("tbody[class='basketGoods']").append(
                  '<tr class="'+cartData[i].id+'">'+
                    '<th scope="row">'+
                      '<div class="float-left align-items-center">'+       
                        '<img src="albums-img/'+data[i].ID_author+'/'+data[i].ID_album+'/'+data[i].album_cover.split('.').join('_s.')+'" alt="" class="mr-2 mt-1 d-inline float-left">'+
                        '<div class="d-inline float-left align-middle">'+
                          '<div class="table-text">'+
                           data[i].alb_name+
                          '</div>'+
                          '<div class="table-text">'+
                           data[i].author_name+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</th>'+
                    '<td class="align-middle">'+cartData[i].price+' р</td>'+
                    '<td class="align-middle">'+
                      '<div class="tab-table">'+
                        typeName+
                      '</div>'+
                    '</td>'+
                    '<td class="align-middle">'+
                      '<div>'+
                        '<input class="form-control-sm change-quantity-goods" data-id='+cartData[i].id+' value='+cartData[i].count+' type="text" size="1" style="background-color: inherit;">'+
                        '<button class="btn-sm btn-danger delete-from-cart" data-id='+cartData[i].id+'><span class="oi oi-trash"></span></button>'+
                      '</div>'+
                    '</td>'+
                    '<td class="align-middle js-summa '+cartData[i].id+'">'+(cartData[i].price*cartData[i].count)+' р</td>'+
                  '</tr>'
                    );
            }
        });
        
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
        cartData.splice(cartData.indexOf(getById(id)),1);
        //console.log(cartData);
        saveData();
        return cartData;
    }

// Изменение количества товара в коллекции
    /*function changeCount(id, delta) {
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
    }*/
    function changeCount(id, newQuantity) {
        var item;
        updateData();
        item = getById(id);
        if(item) {
            item.count = newQuantity;

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

//*****************************************************************************************************************

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
        getSumma:getSumma
    }
})(jQuery);

jQuery(document).ready(cart.init);