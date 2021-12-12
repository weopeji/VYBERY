(function (global) {
    "use strict";

    const callApi = ({ methodName, data }) => {    
        return new Promise((resolve, reject) => 
        {
            global.PostComponents(
                methodName,
                data,
                (response) => {
                    resolve(response)
                }
            )
        });
    }

    class settings
    {
        constructor() {
            this.global_block = $(`
                <div class="settings_page"></div>
            `);
        };

        async renderMenu()
        {
            var _block = $(`
                <div class="settings_page_menu">
                    <div class="settings_page_menu_button">
                        <span>Добавить офера</span>
                    </div>
                </div>
            `);

            return _block;
        }

        async nextAddRender(offer)
        {
            var type = offer.categories[0].name;

            var funs = 
            {
                "Микрозаймы": function() 
                {
                    var template = $(`
                        <div class="settings_page_body_next">

                            <h1>Информация по оферу</h1>

                            <div class="settings_page_body_next_line">
                                <span>Название на Guruleads:</span>
                                <span>${offer.name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Категория:</span>
                                <span>${offer.categories[0].name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Страна:</span>
                                <span>${offer.countries[0].name}</span>
                            </div>

                            <h1>Добавочная информация</h1>

                            <div class="add_offer_block_input_line">
                                <input id="name" type="text" placeholder="Название офера">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="min_money" type="text" placeholder="Минимальная сумма займа">
                            </div>
                            <div class="add_offer_block_input_line">
                                <input id="max_money" type="text" placeholder="Максимальная сумма займа">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="min_date" type="text" placeholder="Минимальное время">
                            </div>
                            <div class="add_offer_block_input_line">
                                <input id="max_date" type="text" placeholder="Максимальное время">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="time" type="text" placeholder="Время предоставления займа">
                            </div>
                            
                            <div class="add_offer_block_input_line">
                                <input id="procent" type="text" placeholder="Процент первого займа">
                            </div>


                            <div class="settings_page_body_next_buttons">
                                <span class="settings_page_body_next_buttons_close">Отказать</span>
                                <span class="settings_page_body_next_buttons_next">Принять</span>
                            </div>
                        </div>
                    `);
        
                    $('.settings_page_body').append(template);
        
                    $('.settings_page_body_next_buttons_close').click(function() {
                        location.reload();
                    })
        
                    $('.settings_page_body_next_buttons_next').click(async function() {
                        var add_offer_next = await callApi({
                            methodName: "add_offer_next",
                            data: {
                                offer: offer,
                                name: $('#name').val(),
                                data: {
                                    min_money: $('#min_money').val(),
                                    max_money: $('#max_money').val(),
                                    min_date: $('#min_date').val(),
                                    max_date: $('#max_date').val(),
                                    time: $('#time').val(),
                                    procent: $('#procent').val(),
                                }
                            },
                        });
        
                        alert('Успешно!');
                        location.reload();
                    })
                },
                "Кредитные карты": function()
                {
                    var template = $(`
                        <div class="settings_page_body_next">

                            <h1>Информация по оферу</h1>

                            <div class="settings_page_body_next_line">
                                <span>Название на Guruleads:</span>
                                <span>${offer.name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Категория:</span>
                                <span>${offer.categories[0].name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Страна:</span>
                                <span>${offer.countries[0].name}</span>
                            </div>

                            <h1>Добавочная информация</h1>

                            <div class="add_offer_block_input_line">
                                <input id="name" type="text" placeholder="Название карты">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="name_bank" type="text" placeholder="Название Банка">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="description" type="text" placeholder="Описание карты">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="money" type="text" placeholder="Кредитный лимит">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="periud" type="text" placeholder="Льготный период">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="how_many" type="text" placeholder="Стоймость обслуживания">
                            </div>


                            <div class="settings_page_body_next_buttons">
                                <span class="settings_page_body_next_buttons_close">Отказать</span>
                                <span class="settings_page_body_next_buttons_next">Принять</span>
                            </div>
                        </div>
                    `);
        
                    $('.settings_page_body').append(template);
        
                    $('.settings_page_body_next_buttons_close').click(function() {
                        location.reload();
                    })
        
                    $('.settings_page_body_next_buttons_next').click(async function() {
                        var add_offer_next = await callApi({
                            methodName: "add_offer_next",
                            data: {
                                offer: offer,
                                name: $('#name').val(),
                                data: {
                                    name_bank: $('#name_bank').val(),
                                    description: $('#description').val(),
                                    money: $('#money').val(),
                                    periud: $('#periud').val(),
                                    how_many: $('#how_many').val(),
                                }
                            },
                        });
        
                        alert('Успешно!');
                        location.reload();
                    })
                },
                "Потребительские кредиты": function()
                {
                    var template = $(`
                        <div class="settings_page_body_next">

                            <h1>Информация по оферу</h1>

                            <div class="settings_page_body_next_line">
                                <span>Название на Guruleads:</span>
                                <span>${offer.name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Категория:</span>
                                <span>${offer.categories[0].name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Страна:</span>
                                <span>${offer.countries[0].name}</span>
                            </div>

                            <h1>Добавочная информация</h1>

                            <div class="add_offer_block_input_line">
                                <input id="name_bank" type="text" placeholder="Название Банка">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="limit" type="text" placeholder="Кредитный лимит">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="date_min" type="text" placeholder="Срок кредита минимальный">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="date_max" type="text" placeholder="Срок кредита максимальный">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="state" type="text" placeholder="Ставка">
                            </div>

                            <div class="settings_page_body_next_buttons">
                                <span class="settings_page_body_next_buttons_close">Отказать</span>
                                <span class="settings_page_body_next_buttons_next">Принять</span>
                            </div>
                        </div>
                    `);
        
                    $('.settings_page_body').append(template);
        
                    $('.settings_page_body_next_buttons_close').click(function() {
                        location.reload();
                    })
        
                    $('.settings_page_body_next_buttons_next').click(async function() {
                        var add_offer_next = await callApi({
                            methodName: "add_offer_next",
                            data: {
                                offer: offer,
                                name: $('#name').val(),
                                data: {
                                    name_bank: $('#name_bank').val(),
                                    limit: $('#limit').val(),
                                    date_min: $('#date_min').val(),
                                    date_max: $('#date_max').val(),
                                    state: $('#state').val(),
                                }
                            },
                        });
        
                        alert('Успешно!');
                        location.reload();
                    })
                },
                "Ипотека": async function()
                {
                    var template = $(`
                        <div class="settings_page_body_next">

                            <h1>Информация по оферу</h1>

                            <div class="settings_page_body_next_line">
                                <span>Название на Guruleads:</span>
                                <span>${offer.name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Категория:</span>
                                <span>${offer.categories[0].name}</span>
                            </div>
                            <div class="settings_page_body_next_line">
                                <span>Страна:</span>
                                <span>${offer.countries[0].name}</span>
                            </div>

                            <h1>Добавочная информация</h1>

                            <div class="add_offer_block_input_line">
                                <input id="name_bank" type="text" placeholder="Название Банка">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="stavka" type="text" placeholder="Ставка">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="pay" type="text" placeholder="Первоначальный взнос">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="money_max" type="text" placeholder="Максимальная сумма ипотеки">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="date_min" type="text" placeholder="Срок кредитования минимальный">
                            </div>

                            <div class="add_offer_block_input_line">
                                <input id="date_max" type="text" placeholder="Срок кредитования максимальный">
                            </div>

                            <div class="settings_page_body_next_buttons">
                                <span class="settings_page_body_next_buttons_close">Отказать</span>
                                <span class="settings_page_body_next_buttons_next">Принять</span>
                            </div>
                        </div>
                    `);
        
                    $('.settings_page_body').append(template);
        
                    $('.settings_page_body_next_buttons_close').click(function() {
                        location.reload();
                    })
        
                    $('.settings_page_body_next_buttons_next').click(async function() {
                        var add_offer_next = await callApi({
                            methodName: "add_offer_next",
                            data: {
                                offer: offer,
                                name: $('#name').val(),
                                data: {
                                    name_bank: $('#name_bank').val(),
                                    stavka: $('#stavka').val(),
                                    pay: $('#pay').val(),
                                    money_max: $('#money_max').val(),
                                    date_min: $('#date_min').val(),
                                    date_max: $('#date_max').val(),
                                }
                            },
                        });
        
                        alert('Успешно!');
                        location.reload();
                    })
                }
            };

            funs[type]();
        }

        async acceptAddOffer()
        {
            var _data = 
            {
                "id_guruleads": $('#id_guruleads').val(),
            }

            $('.add_offer_block').remove();
            $('.settings_page_menu_button span').html('Подтвердите офера');

            var add_offer = await callApi({
                methodName: "add_offer",
                data: _data,
            });

            if(add_offer == "error")
            {
                alert('Ошибка!');
                location.reload();
            } else {
                console.log(add_offer);
                this.nextAddRender(add_offer);
            }
        }

        async renderAddMember()
        {
            var _block = $(`
                <div class="settings_page_body">
                    <div class="add_offer_block">
                        <div class="add_offer_block_input_line">
                            <input id="id_guruleads" type="text" placeholder="ID На Guruleads">
                        </div>

                        <div class="add_offer_block_accept">
                            <span>Принять</span>
                        </div>
                    </div>
                </div>
            `);

            var _this = this;

            _block.find('.add_offer_block_accept').click( function () {
                _this.acceptAddOffer();
            })

            return _block;
        }

        async render() 
        {
            var _more = _GET('more');
            var _this = this;

            var funs = {
                "add_offer": async function ()
                {
                    _this.global_block.append(await _this.renderMenu());
                    _this.global_block.append(await _this.renderAddMember());
        
                    $('.index_page').append(_this.global_block);
                },
            }

            funs[_more]();
        }
    }

    global.Components.settings = settings;
    

}(window))