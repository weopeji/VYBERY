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

    class cards
    {
        constructor() 
        {
            this.global_block = $(`
                <div class="index_page_body">
                    <div class="index_page_body_block">
                        <h1>Предложения</h1>

                        <div class="index_page_body_block_present_cards default_style_block">

                            

                        </div>
                    </div>
                </div>
            `);
        };

        async render_intro()
        {
            var _block = $(`
                <div class="intro_members">
                    <div class="intro_members_row">
                        <h1>Кредитные карты</h1>
                        <p>Выберите лучшие микрокредиты от МФО, проверенных нашими экспертами. На 16.11.2021 вам доступно 191 займ со ставкой от 0% в день. Увеличьте шансы на получение денег — отправьте заявку минимум в две МФО.</p>
                        <div class="intro_members_input_block">
                            <div class="intro_members_input_block_inputs">
                                <div class="intro_members_input_block_inputs_more">
                                    <input type="text" placeholder="Кредитный лимит" data="money" inputmode="numeric">
                                    <div class="intro_members_input_block_inputs_more_scrolling">
                                        <input type="range" min="1" max="100" value="0" data="scroll_money">
                                    </div>
                                </div>
                                <div class="intro_members_input_block_inputs_more">
                                    <input type="text" placeholder="Льготный период" data="days" inputmode="numeric">
                                    <div class="intro_members_input_block_inputs_more_scrolling">
                                        <input type="range" min="1" max="100" value="0">
                                    </div>
                                </div>
                            </div>
                            <span data="show">Показать</span>
                        </div>
                    </div>
                </div>
            `);   

            _block.find('span[data="show"]').click( function() {
                new all_members().renderType({
                    money: $('input[data="money"]').val(),
                    days: $('input[data="days"]').val()
                });
            })

            _block.find('input[data="scroll_money"]').on('input',function () {
                var iVal = $(this).val();
                $('input[data="money"]').val(iVal * 1000);
            });

            _block.find('input[data="money"]').on('input',function () {
                var iVal = $(this).val();
                if(iVal > 100000)
                {
                    $(this).val(100000);
                }
                $('input[data="scroll_money"]').val(Math.round(iVal / 1000));
            });

            _block.find('input[data="money"]').keypress(function(event){
                event = event || window.event;
                if (event.charCode && event.charCode!=0 && (event.charCode < 48 || event.charCode > 57) )
                  return false;
            });

            $('.index_page').append(_block);
        }

        async render_body()
        {
            var getallCards = await callApi({
                methodName: "getallCards",
                data: null,
            });

            var _this       = this;

            this.global_block.find('.index_page_body_block_present').css('flex-wrap', 'wrap');

            getallCards.forEach(el => 
            {
                var time = el.data.time;

                if(time <= 5)
                {
                    time = `<green>до ${time} минут</green>`;
                }

                if(time <= 15 && time >= 6)
                {
                    time = `<yellow>до ${time} минут</yellow>`;
                }

                if(time >= 16)
                {
                    time = `<red>до ${time} минут</red>`;
                }


                var _block = $(`
                    <div class="getallCards">
                        <div class="getallCards_img">
                            <img src="${el.img}" alt="">
                            <p>${el.data.name_bank}</p>
                        </div>
                        <div class="getallCards_body">
                            <div class="getallCards_body_header">
                                <h1>${el.name}</h1>
                                <p>${el.data.description}</p>
                            </div>
                            <div class="getallCards_body_description">
                                <div class="getallCards_body_description_line">
                                    <span>Кредитный лимит</span>
                                    <h1>${el.data.money} ₽</h1>
                                </div>
                                <div class="getallCards_body_description_line">
                                    <span>Льготный период</span>
                                    <h1>${el.data.periud} дней</h1>
                                </div>
                                <div class="getallCards_body_description_line">
                                    <span>Стоймость обслуживания</span>
                                    <h1>${el.data.how_many} ₽ / год</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

                _block.click( function() {
                    location.href = $(this).attr('data');
                })

                _this.global_block.find('.index_page_body_block_present_cards').append(_block);
            })
            
            $('.index_page').append(_this.global_block);
        }

        async render()
        {
            await this.render_intro();
            await this.render_body();
        }
    }

    global.Components.cards = cards;
    

}(window))