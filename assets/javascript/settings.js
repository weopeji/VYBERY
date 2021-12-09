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
            var template = $(`
                <div class="settings_page_body_next">
                    <h1>Информация по оферу</h1>
                    <div class="settings_page_body_next_line">
                        <span>Название на сайте:</span>
                        <span>${offer.data.name}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Название на Guruleads:</span>
                        <span>${offer.element.name}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Категория:</span>
                        <span>${offer.element.categories[0].name}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Страна:</span>
                        <span>${offer.element.countries[0].name}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Минимальный займ:</span>
                        <span>${offer.data.min_money}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Максимальный займ:</span>
                        <span>${offer.data.max_money}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Время взятия займа:</span>
                        <span>${offer.data.time}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Минимальное время взятия займа:</span>
                        <span>${offer.data.min_date}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Максимальное время взятия займа:</span>
                        <span>${offer.data.max_date}</span>
                    </div>
                    <div class="settings_page_body_next_line">
                        <span>Процент первого займа:</span>
                        <span>${offer.data.procent}</span>
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
                    data: offer,
                });

                alert('Успешно!');
                location.reload();
            })
        }

        async acceptAddOffer()
        {
            var _data = 
            {
                "name": $('#name').val(),
                "min_money": $('#min_money').val(),
                "max_money": $('#max_money').val(),
                "time": $('#time').val(),
                "min_date": $('#min_date').val(),
                "max_date": $('#max_date').val(),
                "procent": $('#procent').val(),
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
                this.nextAddRender(add_offer);
            }
        }

        async renderAddMember()
        {
            var _block = $(`
                <div class="settings_page_body">
                    <div class="add_offer_block">

                        <div class="add_offer_block_input_line">
                            <input id="name" type="text" placeholder="Название офера">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="id_guruleads" type="text" placeholder="ID На Guruleads">
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
            this.global_block.append(await this.renderMenu());
            this.global_block.append(await this.renderAddMember());

            $('.index_page').append(this.global_block);
        }
    }

    console.log(global.Components);
    global.Components.settings = settings;
    

}(window))