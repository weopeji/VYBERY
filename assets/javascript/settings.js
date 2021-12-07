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
                "admin_rate": $('#admin_rate').val(),
                "url_guruleads": $('#url_guruleads').val(),
                "img": $('#img').val(),
            }

            var add_offer = await callApi({
                methodName: "add_offer",
                data: _data,
            });

            alert('МФО Добавлено!');

            location.reload();
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
                            <input id="min_money" type="text" placeholder="Минимальная сумма займа">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="max_money" type="text" placeholder="Максимальная сумма займа">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="time" type="text" placeholder="Время предоставления займа">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="min_date" type="text" placeholder="Минимальное время">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="max_date" type="text" placeholder="Максимальное время">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="procent" type="text" placeholder="Процент первого займа">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="id_guruleads" type="text" placeholder="ID На Guruleads">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="admin_rate" type="text" placeholder="Наш рейтинг на сайта (Лучше всегда ставить 0)">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="url_guruleads" type="text" placeholder="Главная реферальная ссылка">
                        </div>
                        <div class="add_offer_block_input_line">
                            <input id="img" type="text" placeholder="Название фотографии на сервере">
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